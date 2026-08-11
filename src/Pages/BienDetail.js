import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import NonTrouvee from './NonTrouvee'
import ReservationModal from '../Components/ReservationModal'
import { enrichirBien } from '../utils/enrichirBien'
import './BienDetail.css'

function formaterPrix(bien) {
  const prixFormate = bien.prix.toLocaleString('fr-FR')
  if (bien.transaction === 'vente') return { montant: `${prixFormate} FCFA`, suffixe: 'prix de vente' }
  if (bien.type === 'terrain') return { montant: `${prixFormate} FCFA`, suffixe: '/ mois' }
  return { montant: `${prixFormate} FCFA`, suffixe: '/ nuit' }
}

function Etoiles({ note }) {
  // note est sur 10 ; on l'affiche sur 5 étoiles.
  const pleines = Math.round(note / 2)
  return (
    <span className="etoiles" aria-label={`${note.toFixed(1)} sur 10`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < pleines ? 'etoile etoile--pleine' : 'etoile'}>★</span>
      ))}
    </span>
  )
}

function BienDetail({ biens, typeAttendu }) {
  const { id } = useParams()
  const bien = biens.find((b) => b.id === id && (!typeAttendu || b.type === typeAttendu))
  const [photoActive, setPhotoActive] = useState(0)
  const [reservationOuverte, setReservationOuverte] = useState(false)

  // useMemo est appelé avant le "return" conditionnel pour respecter
  // les règles des hooks, même si `bien` peut être introuvable.
  const enrichi = useMemo(() => (bien ? enrichirBien(bien) : null), [bien])

  if (!bien) {
    return <NonTrouvee />
  }

  const prix = formaterPrix(bien)
  const retourLibelle = { villa: 'aux villas', terrain: 'aux terrains', maison: 'aux maisons' }[bien.type]
  const retourLien = { villa: '/villas', terrain: '/terrains', maison: '/maisons' }[bien.type]
  const estTerrain = bien.type === 'terrain'
  const photos = enrichi.photos
  const photoCourante = photos[photoActive] || photos[0]

  return (
    <article className="bien-detail conteneur section">
      <Link to={retourLien} className="bien-detail-retour">← Retour {retourLibelle}</Link>

      <div className="bien-detail-galerie">
        <div
          className="bien-detail-image"
          style={{ backgroundImage: `url(${photoCourante.url})` }}
        >
          <span className={`bien-detail-badge bien-detail-badge--${bien.transaction}`}>
            {bien.transaction === 'vente' ? 'À vendre' : 'À louer'}
          </span>
          <span className={`bien-detail-disponibilite ${enrichi.disponible ? '' : 'bien-detail-disponibilite--non'}`}>
            {enrichi.disponible ? '● Disponible' : '● Actuellement indisponible'}
          </span>
          <span className="bien-detail-photo-legende">{photoCourante.label}</span>
        </div>

        <div className="bien-detail-vignettes">
          {photos.map((photo, i) => (
            <button
              key={photo.label}
              type="button"
              className={`bien-detail-vignette ${i === photoActive ? 'bien-detail-vignette--active' : ''}`}
              style={{ backgroundImage: `url(${photo.url})` }}
              onClick={() => setPhotoActive(i)}
              aria-label={photo.label}
            >
              <span>{photo.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bien-detail-entete">
        <div>
          <h1>{bien.nom}</h1>
          <p className="bien-detail-ville">{bien.ville}</p>
        </div>
        <div className="bien-detail-prix-bloc">
          <p className="bien-detail-prix">
            {prix.montant} <span>{prix.suffixe}</span>
          </p>
          <p className="bien-detail-note">
            <Etoiles note={bien.note} /> {bien.note.toFixed(1)} · {bien.avis} avis
          </p>
        </div>
      </div>

      <ul className="bien-detail-caracteristiques">
        {bien.type !== 'terrain' && <li>{bien.chambres} chambres</li>}
        {bien.type === 'villa' && <li>{bien.voyageurs} voyageurs max</li>}
        {(bien.type === 'terrain' || bien.type === 'maison') && (
          <li>{bien.superficie.toLocaleString('fr-FR')} m²</li>
        )}
        {(bien.type === 'villa' || bien.type === 'maison') && (
          <li>{bien.piscine ? 'Piscine privée' : 'Sans piscine'}</li>
        )}
      </ul>

      <p className="bien-detail-description">{bien.description}</p>

      {estTerrain ? (
        <>
          <section className="bien-detail-section">
            <h2>Statut juridique &amp; documents disponibles</h2>
            <p className="bien-detail-statut">{enrichi.statutJuridique}</p>
            <ul className="bien-detail-chips">
              {enrichi.documents.map((doc) => (
                <li key={doc} className="bien-detail-chip bien-detail-chip--document">📄 {doc}</li>
              ))}
            </ul>
          </section>

          <section className="bien-detail-section">
            <h2>Avantages du terrain</h2>
            <ul className="bien-detail-chips">
              {enrichi.avantages.map((a) => (
                <li key={a} className="bien-detail-chip bien-detail-chip--avantage">✓ {a}</li>
              ))}
            </ul>
          </section>
        </>
      ) : (
        <section className="bien-detail-section">
          <h2>Avis des clients</h2>
          <div className="bien-detail-avis">
            {enrichi.avisListe.map((avis, i) => (
              <div key={i} className="avis-carte">
                <div className="avis-carte-entete">
                  <span className="avis-carte-auteur">{avis.auteur}</span>
                  <span className="avis-carte-note">{avis.note} / 10</span>
                </div>
                <p className="avis-carte-texte">{avis.commentaire}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="bien-detail-actions">
        <button
          type="button"
          className="bouton bouton-plein"
          onClick={() => setReservationOuverte(true)}
          disabled={!enrichi.disponible}
        >
          {enrichi.disponible ? 'Réserver ce bien' : 'Indisponible pour le moment'}
        </button>
        <Link to="/contact" className="bouton bouton-contour bien-detail-lien-contact">
          {bien.transaction === 'vente' ? "Demander plus d'informations" : 'Poser une question'}
        </Link>
      </div>

      {reservationOuverte && (
        <ReservationModal
          bien={bien}
          prixLibelle={`${prix.montant} ${prix.suffixe}`}
          onFermer={() => setReservationOuverte(false)}
        />
      )}
    </article>
  )
}

export default BienDetail
