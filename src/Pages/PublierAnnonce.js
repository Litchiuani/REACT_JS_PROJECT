import { useState } from 'react'
import '../Components/Formulaire.css'

const VALEURS_INITIALES = {
  nom: '',
  ville: '',
  type: 'villa',
  transaction: 'location',
  prix: '',
  description: '',
  contact: '',
  piscine: false,
}

/**
 * Formulaire de dépôt d'annonce, proposé aux vendeurs (voir la
 * fenêtre de bienvenue acheteur/vendeur). Aucun backend pour
 * l'instant : la demande est simplement confirmée, comme sur la
 * page Contact — une vraie mise en ligne suppose une vérification
 * par l'équipe TerangaVillas avant publication sur la carte.
 */
function PublierAnnonce() {
  const [formulaire, setFormulaire] = useState(VALEURS_INITIALES)
  const [envoye, setEnvoye] = useState(false)

  function gererChangement(e) {
    const { name, value, type, checked } = e.target
    setFormulaire((precedent) => ({ ...precedent, [name]: type === 'checkbox' ? checked : value }))
  }

  function gererEnvoi(e) {
    e.preventDefault()
    setEnvoye(true)
  }

  if (envoye) {
    return (
      <section className="section conteneur formulaire-page">
        <h1>Annonce reçue 🎉</h1>
        <p>
          Merci ! Votre bien <strong>{formulaire.nom || 'votre annonce'}</strong> est en cours de
          vérification par notre équipe et apparaîtra sur la carte sous 24 à 48h.
        </p>
      </section>
    )
  }

  return (
    <section className="section conteneur formulaire-page">
      <p className="section-titre-eyebrow">Vendeurs & propriétaires</p>
      <h1>Publier une annonce</h1>
      <p className="section-soustitre">
        Louez votre villa ou vendez votre terrain / maison à des milliers de visiteurs, du Sénégal
        et d'ailleurs.
      </p>

      <form onSubmit={gererEnvoi} className="formulaire">
        <label>
          Nom du bien
          <input type="text" name="nom" value={formulaire.nom} onChange={gererChangement} required />
        </label>

        <div className="formulaire-ligne">
          <label>
            Ville
            <input type="text" name="ville" value={formulaire.ville} onChange={gererChangement} required />
          </label>

          <label>
            Type de bien
            <select name="type" value={formulaire.type} onChange={gererChangement}>
              <option value="villa">Villa</option>
              <option value="terrain">Terrain</option>
              <option value="maison">Maison</option>
            </select>
          </label>
        </div>

        <div className="formulaire-ligne">
          <label>
            Je veux
            <select name="transaction" value={formulaire.transaction} onChange={gererChangement}>
              <option value="location">Louer</option>
              <option value="vente">Vendre</option>
            </select>
          </label>

          <label>
            Prix (FCFA)
            <input
              type="number"
              name="prix"
              min="0"
              value={formulaire.prix}
              onChange={gererChangement}
              required
            />
          </label>
        </div>

        <label>
          Description
          <textarea
            name="description"
            rows="4"
            value={formulaire.description}
            onChange={gererChangement}
            required
          />
        </label>

        <label>
          Téléphone ou email de contact
          <input type="text" name="contact" value={formulaire.contact} onChange={gererChangement} required />
        </label>

        <label className="formulaire-checkbox">
          <input type="checkbox" name="piscine" checked={formulaire.piscine} onChange={gererChangement} />
          Avec piscine
        </label>

        <button type="submit" className="bouton bouton-plein">Envoyer mon annonce</button>
        <p className="formulaire-note">
          En publiant, vous acceptez que votre annonce soit vérifiée avant sa mise en ligne.
        </p>
      </form>
    </section>
  )
}

export default PublierAnnonce
