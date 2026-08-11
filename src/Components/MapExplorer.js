import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Link } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import biens, { CENTRE_PAR_DEFAUT, TYPES } from '../data/biens'
import pubs from '../data/pubs'
import { distanceKm, formaterDistance } from '../utils/geo'
import SearchBar from './SearchBar'
import './MapExplorer.css'

const RAYONS = [
  { valeur: 15, libelle: '15 km' },
  { valeur: 30, libelle: '30 km' },
  { valeur: 60, libelle: '60 km' },
  { valeur: 9999, libelle: 'Tout le Sénégal' },
]

function creerIcone(className, emoji) {
  return L.divIcon({
    className: 'map-pin-wrapper',
    html: `<span class="map-pin ${className}">${emoji}</span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 32],
    popupAnchor: [0, -30],
  })
}

const ICONES = {
  villa: creerIcone('map-pin--villa', '🏖️'),
  terrain: creerIcone('map-pin--terrain', '🌳'),
  maison: creerIcone('map-pin--maison', '🏠'),
  pub: creerIcone('map-pin--pub', '📣'),
  utilisateur: creerIcone('map-pin--utilisateur', '📍'),
}

function formaterPrixCourt(bien) {
  const montant = bien.prix.toLocaleString('fr-FR')
  if (bien.transaction === 'vente') return `${montant} FCFA`
  return `${montant} FCFA / ${bien.type === 'terrain' ? 'mois' : 'nuit'}`
}

/** Recentre la carte en douceur quand la position ou la sélection change. */
function RecentrerCarte({ centre, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo([centre.lat, centre.lng], zoom, { duration: 0.8 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centre.lat, centre.lng, zoom])
  return null
}

function MapExplorer() {
  const [position, setPosition] = useState(null)
  const [statutPosition, setStatutPosition] = useState('inconnue') // inconnue | chargement | ok | refuse
  const [filtre, setFiltre] = useState({ recherche: '', type: 'tous', transaction: 'tous' })
  const [rayon, setRayon] = useState(30)
  const [bienActifId, setBienActifId] = useState(null)

  const [erreurPosition, setErreurPosition] = useState(null)

  function demanderPosition() {
    if (!navigator.geolocation) {
      setStatutPosition('refuse')
      setErreurPosition("Ce navigateur ne prend pas en charge la géolocalisation.")
      return
    }
    setStatutPosition('chargement')
    setErreurPosition(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setStatutPosition('ok')
      },
      (err) => {
        setStatutPosition('refuse')
        if (err.code === err.PERMISSION_DENIED) {
          setErreurPosition("Position refusée dans le navigateur (ou désactivée dans les réglages système).")
        } else if (err.code === err.TIMEOUT) {
          setErreurPosition("La localisation a pris trop de temps — réessayez.")
        } else {
          setErreurPosition("Position indisponible sur cet appareil.")
        }
      },
      // enableHighAccuracy à false : on privilégie la localisation par
      // Wi-Fi/réseau, plus rapide et fiable sur un ordinateur sans GPS
      // actif, que le GPS matériel qui expire souvent en intérieur.
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    )
  }

  // On tente de localiser l'utilisateur automatiquement à l'arrivée
  // sur la carte — s'il refuse, on retombe sur le centre par défaut.
  useEffect(() => {
    demanderPosition()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Le Sénégal fait ~350 km dans sa plus grande largeur : au-delà de
  // 400 km de Dakar, on considère que l'utilisateur navigue depuis
  // l'étranger et on lui montre tout le catalogue plutôt que "0 bien".
  const SEUIL_HORS_SENEGAL_KM = 400
  const distanceDakar = position
    ? distanceKm(CENTRE_PAR_DEFAUT.lat, CENTRE_PAR_DEFAUT.lng, position.lat, position.lng)
    : null
  const horsSenegal = distanceDakar !== null && distanceDakar > SEUIL_HORS_SENEGAL_KM
  // positionLocale = la position ne sert à centrer/filtrer que si
  // l'utilisateur est plausiblement au Sénégal ou à proximité.
  const positionLocale = position && !horsSenegal ? position : null

  const centre = positionLocale || CENTRE_PAR_DEFAUT

  const biensAvecDistance = useMemo(() => {
    return biens
      .map((b) => ({ ...b, distance: distanceKm(centre.lat, centre.lng, b.lat, b.lng) }))
      .sort((a, b) => a.distance - b.distance)
  }, [centre.lat, centre.lng])

  const biensFiltres = useMemo(() => {
    const q = filtre.recherche.trim().toLowerCase()
    return biensAvecDistance.filter((b) => {
      const correspondType = filtre.type === 'tous' || b.type === filtre.type
      const correspondTransaction = filtre.transaction === 'tous' || b.transaction === filtre.transaction
      const correspondRecherche = !q || b.ville.toLowerCase().includes(q) || b.nom.toLowerCase().includes(q)
      const correspondRayon = !positionLocale || rayon >= 9999 || b.distance <= rayon
      return correspondType && correspondTransaction && correspondRecherche && correspondRayon
    })
  }, [biensAvecDistance, filtre, rayon, positionLocale])

  const bienActif = biensFiltres.find((b) => b.id === bienActifId)
  const centreCible = bienActif ? { lat: bienActif.lat, lng: bienActif.lng } : centre
  const zoomCible = bienActif ? 13 : positionLocale ? 11 : 8

  return (
    <section className="explorateur">
      <div className="explorateur-recherche conteneur">
        <SearchBar
          variante="carte"
          onRecherche={setFiltre}
          onPositionDemandee={demanderPosition}
          rechercheEnCours={statutPosition === 'chargement'}
        />
      </div>

      <div className="explorateur-corps conteneur">
        <aside className="explorateur-liste">
          <div className="explorateur-liste-entete">
            <p>
              <strong>{biensFiltres.length}</strong> bien{biensFiltres.length > 1 ? 's' : ''}
              {positionLocale ? ' autour de vous' : ' au Sénégal'}
            </p>
            {statutPosition === 'refuse' && (
              <p className="explorateur-avertissement">
                {erreurPosition || 'Position non partagée'} — affichage centré sur Dakar. <button type="button" onClick={demanderPosition}>Réessayer</button>
              </p>
            )}
            {horsSenegal && (
              <p className="explorateur-avertissement">
                Vous semblez être en dehors du Sénégal — voici tout le catalogue disponible.
              </p>
            )}
          </div>


          {positionLocale && (
            <div className="explorateur-rayons">
              {RAYONS.map((r) => (
                <button
                  key={r.valeur}
                  type="button"
                  className={`chip chip--petit ${rayon === r.valeur ? 'chip--actif' : ''}`}
                  onClick={() => setRayon(r.valeur)}
                >
                  {r.libelle}
                </button>
              ))}
            </div>
          )}

          <div className="explorateur-liste-scroll">
            {biensFiltres.length === 0 && (
              <p className="explorateur-vide">Aucun bien ne correspond à cette recherche dans ce rayon.</p>
            )}
            {biensFiltres.map((bien) => (
              <button
                key={bien.id}
                type="button"
                className={`explorateur-ligne ${bienActifId === bien.id ? 'explorateur-ligne--active' : ''}`}
                onClick={() => setBienActifId(bien.id)}
              >
                <div
                  className="explorateur-ligne-image"
                  style={{ backgroundImage: `url(${bien.image})` }}
                />
                <div className="explorateur-ligne-corps">
                  <p className="explorateur-ligne-titre">{bien.nom}</p>
                  <p className="explorateur-ligne-ville">
                    {TYPES[bien.type].libelleSingulier} · {bien.ville}
                    {positionLocale && ` · ${formaterDistance(bien.distance)}`}
                  </p>
                  <p className="explorateur-ligne-prix">{formaterPrixCourt(bien)}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="explorateur-carte">
          <MapContainer
            center={[centre.lat, centre.lng]}
            zoom={positionLocale ? 11 : 8}
            scrollWheelZoom
            className="leaflet-conteneur"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RecentrerCarte centre={centreCible} zoom={zoomCible} />

            {positionLocale && (
              <Marker position={[positionLocale.lat, positionLocale.lng]} icon={ICONES.utilisateur}>
                <Popup>Vous êtes ici</Popup>
              </Marker>
            )}

            {biensFiltres.map((bien) => (
              <Marker
                key={bien.id}
                position={[bien.lat, bien.lng]}
                icon={ICONES[bien.type]}
                eventHandlers={{ click: () => setBienActifId(bien.id) }}
              >
                <Popup>
                  <div className="popup-bien">
                    <img src={bien.image} alt={bien.nom} />
                    <p className="popup-bien-titre">{bien.nom}</p>
                    <p className="popup-bien-ville">{bien.ville} {positionLocale && `· ${formaterDistance(bien.distance)}`}</p>
                    <p className="popup-bien-prix">{formaterPrixCourt(bien)}</p>
                    <Link to={`/${TYPES[bien.type].route}/${bien.id}`} className="popup-bien-lien">
                      Voir la fiche →
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}

            {pubs.map((pub) => (
              <Marker key={pub.id} position={[pub.lat, pub.lng]} icon={ICONES.pub}>
                <Popup>
                  <div className="popup-bien">
                    <img src={pub.image} alt={pub.entreprise} />
                    <p className="popup-bien-titre">{pub.entreprise}</p>
                    <p className="popup-bien-ville">{pub.secteur} · {pub.ville}</p>
                    <p className="popup-pub-texte">{pub.description}</p>
                    <span className="popup-pub-badge">Publicité</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  )
}

export default MapExplorer
