import { Link } from 'react-router-dom'
import './BienCard.css'

/**
 * Carte générique pour un bien (villa, terrain ou maison).
 * L'affichage du prix et des caractéristiques s'adapte au type
 * et à la transaction (location vs vente) plutôt que de dupliquer
 * une carte par catégorie.
 */
function formaterPrix(bien) {
  const prixFormate = bien.prix.toLocaleString('fr-FR')
  if (bien.transaction === 'vente') {
    return { montant: `${prixFormate} FCFA`, suffixe: 'prix de vente' }
  }
  if (bien.type === 'terrain') {
    return { montant: `${prixFormate} FCFA`, suffixe: '/ mois' }
  }
  return { montant: `${prixFormate} FCFA`, suffixe: '/ nuit' }
}

function noteLibelle(note) {
  if (note >= 9) return 'Exceptionnel'
  if (note >= 8.5) return 'Fabuleux'
  if (note >= 8) return 'Superbe'
  return 'Très bien'
}

function BienCard({ bien }) {
  const prix = formaterPrix(bien)
  const routeBase = bien.type === 'villa' ? 'villas' : bien.type === 'terrain' ? 'terrains' : 'maisons'

  return (
    <Link to={`/${routeBase}/${bien.id}`} className="bien-card">
      <div className="bien-card-image" style={{ backgroundImage: `url(${bien.image})` }}>
        <span className="bien-card-coeur" aria-hidden="true">♡</span>
        <span className={`bien-card-badge bien-card-badge--${bien.transaction}`}>
          {bien.transaction === 'vente' ? 'À vendre' : 'À louer'}
        </span>
        {bien.piscine && <span className="bien-card-piscine">Piscine</span>}
      </div>

      <div className="bien-card-corps">
        <div className="bien-card-entete">
          <div>
            <h3>{bien.nom}</h3>
            <p className="bien-card-ville">{bien.ville}</p>
          </div>
          <div className="bien-card-note">
            <span className="bien-card-note-libelle">{noteLibelle(bien.note)}</span>
            <span className="bien-card-note-chiffre">{bien.note.toFixed(1)}</span>
          </div>
        </div>

        <p className="bien-card-details">
          {bien.type === 'villa' && `${bien.chambres} chambres · ${bien.voyageurs} voyageurs`}
          {bien.type === 'terrain' && `${bien.superficie.toLocaleString('fr-FR')} m²`}
          {bien.type === 'maison' && `${bien.chambres} chambres · ${bien.superficie.toLocaleString('fr-FR')} m²`}
        </p>

        <p className="bien-card-avis">{bien.avis} expériences vécues</p>

        <p className="bien-card-prix">
          {bien.transaction === 'vente' ? 'À partir de ' : ''}
          <strong>{prix.montant}</strong> <span>{prix.suffixe}</span>
        </p>
      </div>
    </Link>
  )
}

export default BienCard
