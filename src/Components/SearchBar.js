import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import biens from '../data/biens'
import './SearchBar.css'

const villesUniques = [...new Set(biens.map((b) => b.ville))].sort()

const TYPES_RAPIDES = [
  { valeur: 'tous', libelle: 'Tous' },
  { valeur: 'villa', libelle: 'Villas' },
  { valeur: 'terrain', libelle: 'Terrains' },
  { valeur: 'maison', libelle: 'Maisons' },
]

const TRANSACTIONS_RAPIDES = [
  { valeur: 'tous', libelle: 'Louer ou acheter' },
  { valeur: 'location', libelle: 'Louer' },
  { valeur: 'vente', libelle: 'Acheter' },
]

/**
 * Barre de recherche « une seule fois, efficace » :
 * - autocomplétion instantanée sur les villes et noms de biens
 * - filtres type / transaction en un clic (pas de menu déroulant à ouvrir)
 * - bouton "Près de moi" qui recentre la carte sur la position réelle
 *
 * variante="accueil" pilote la carte en direct via onRecherche/onPositionDemandee
 * (pas de rechargement de page). Sans ces props, elle se comporte comme une
 * recherche classique et redirige vers /recherche.
 */
function SearchBar({ variante = 'accueil', onRecherche, onPositionDemandee, rechercheEnCours = false }) {
  const navigate = useNavigate()
  const [destination, setDestination] = useState('')
  const [type, setType] = useState('tous')
  const [transaction, setTransaction] = useState('tous')
  const [suggestionsOuvertes, setSuggestionsOuvertes] = useState(false)
  const champRef = useRef(null)

  const suggestions = useMemo(() => {
    const q = destination.trim().toLowerCase()
    if (!q) return []
    const villes = villesUniques.filter((v) => v.toLowerCase().includes(q))
    const noms = biens
      .filter((b) => b.nom.toLowerCase().includes(q))
      .map((b) => b.nom)
      .filter((n) => !villes.includes(n))
    return [...villes, ...noms].slice(0, 6)
  }, [destination])

  function declencherRecherche(criteresPartiels = {}) {
    const criteres = {
      recherche: destination,
      type,
      transaction,
      ...criteresPartiels,
    }
    setSuggestionsOuvertes(false)
    if (onRecherche) {
      onRecherche(criteres)
    } else {
      const params = new URLSearchParams()
      if (criteres.recherche) params.set('q', criteres.recherche)
      if (criteres.type !== 'tous') params.set('type', criteres.type)
      if (criteres.transaction !== 'tous') params.set('transaction', criteres.transaction)
      navigate(`/recherche?${params.toString()}`)
    }
  }

  function choisirSuggestion(valeur) {
    setDestination(valeur)
    setSuggestionsOuvertes(false)
    declencherRecherche({ recherche: valeur })
    champRef.current?.blur()
  }

  function basculerChip(groupe, valeur) {
    if (groupe === 'type') {
      setType(valeur)
      declencherRecherche({ type: valeur })
    } else {
      setTransaction(valeur)
      declencherRecherche({ transaction: valeur })
    }
  }

  return (
    <form
      className={`barre-recherche barre-recherche--${variante}`}
      onSubmit={(e) => {
        e.preventDefault()
        declencherRecherche()
      }}
    >
      <div className="barre-recherche-ligne">
        <div className="barre-recherche-champ barre-recherche-champ--destination">
          <span className="barre-recherche-icone">📍</span>
          <div className="barre-recherche-champ-corps">
            <label htmlFor="destination">Destination</label>
            <input
              id="destination"
              ref={champRef}
              type="text"
              autoComplete="off"
              placeholder="Ville, quartier ou nom d'un bien (Saly, Ngor, Almadies...)"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
                setSuggestionsOuvertes(true)
              }}
              onFocus={() => setSuggestionsOuvertes(true)}
              onBlur={() => setTimeout(() => setSuggestionsOuvertes(false), 120)}
            />
          </div>
          {destination && (
            <button
              type="button"
              className="barre-recherche-effacer"
              aria-label="Effacer la destination"
              onClick={() => {
                setDestination('')
                declencherRecherche({ recherche: '' })
              }}
            >
              ✕
            </button>
          )}

          {suggestionsOuvertes && suggestions.length > 0 && (
            <ul className="barre-recherche-suggestions">
              {suggestions.map((s) => (
                <li key={s}>
                  <button type="button" onMouseDown={() => choisirSuggestion(s)}>
                    🔎 {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {onPositionDemandee && (
          <button
            type="button"
            className="barre-recherche-position"
            onClick={onPositionDemandee}
            disabled={rechercheEnCours}
          >
            {rechercheEnCours ? '📡 Localisation…' : '🎯 Près de moi'}
          </button>
        )}

        <button type="submit" className="barre-recherche-bouton">
          Rechercher
        </button>
      </div>

      <div className="barre-recherche-chips">
        <div className="barre-recherche-groupe-chips">
          {TYPES_RAPIDES.map((t) => (
            <button
              key={t.valeur}
              type="button"
              className={`chip ${type === t.valeur ? 'chip--actif' : ''}`}
              onClick={() => basculerChip('type', t.valeur)}
            >
              {t.libelle}
            </button>
          ))}
        </div>
        <div className="barre-recherche-groupe-chips">
          {TRANSACTIONS_RAPIDES.map((t) => (
            <button
              key={t.valeur}
              type="button"
              className={`chip ${transaction === t.valeur ? 'chip--actif' : ''}`}
              onClick={() => basculerChip('transaction', t.valeur)}
            >
              {t.libelle}
            </button>
          ))}
        </div>
      </div>
    </form>
  )
}

export default SearchBar
