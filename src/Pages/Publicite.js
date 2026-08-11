import { useEffect, useState } from 'react'
import pubsInitiales from '../data/pubs'
import AdBanner from '../Components/AdBanner'
import '../Components/Formulaire.css'
import './Publicite.css'

const CLE_STOCKAGE = 'teranga-pubs-utilisateur'

const VALEURS_INITIALES = {
  entreprise: '',
  secteur: '',
  ville: '',
  description: '',
  lien: '',
}

function chargerPubsUtilisateur() {
  try {
    const brut = window.localStorage.getItem(CLE_STOCKAGE)
    return brut ? JSON.parse(brut) : []
  } catch {
    return []
  }
}

/**
 * Page dédiée aux entrepreneurs qui veulent faire connaître leur
 * activité (déménagement, décoration, sécurité, notaire...) auprès
 * des utilisateurs de TerangaVillas. Sans backend, la pub soumise
 * est enregistrée dans ce navigateur et affichée immédiatement en
 * aperçu, en attendant une validation avant diffusion à tous.
 */
function Publicite() {
  const [pubsUtilisateur, setPubsUtilisateur] = useState(chargerPubsUtilisateur)
  const [formulaire, setFormulaire] = useState(VALEURS_INITIALES)
  const [envoye, setEnvoye] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(pubsUtilisateur))
  }, [pubsUtilisateur])

  function gererChangement(e) {
    const { name, value } = e.target
    setFormulaire((precedent) => ({ ...precedent, [name]: value }))
  }

  function gererEnvoi(e) {
    e.preventDefault()
    const nouvellePub = {
      id: `pub-utilisateur-${Date.now()}`,
      ...formulaire,
      lien: formulaire.lien || '#',
      image: `https://picsum.photos/seed/${encodeURIComponent(formulaire.entreprise || 'pub')}/500/320`,
    }
    setPubsUtilisateur((precedent) => [nouvellePub, ...precedent])
    setFormulaire(VALEURS_INITIALES)
    setEnvoye(true)
  }

  return (
    <>
      <section className="section conteneur formulaire-page">
        <p className="section-titre-eyebrow">Entrepreneurs</p>
        <h1>Faites connaître votre activité</h1>
        <p className="section-soustitre">
          Déménagement, décoration, sécurité, notaire, artisans... touchez les acheteurs et
          vendeurs de biens au Sénégal en apparaissant sur la carte et le bandeau publicitaire.
        </p>

        {envoye && (
          <p className="publicite-confirmation">
            ✅ Votre publicité a bien été enregistrée. Un aperçu est visible ci-dessous, en attendant
            sa validation par notre équipe avant diffusion à tous les visiteurs.
          </p>
        )}

        <form onSubmit={gererEnvoi} className="formulaire">
          <div className="formulaire-ligne">
            <label>
              Nom de l'entreprise
              <input
                type="text"
                name="entreprise"
                value={formulaire.entreprise}
                onChange={gererChangement}
                required
              />
            </label>

            <label>
              Secteur d'activité
              <input
                type="text"
                name="secteur"
                placeholder="Déménagement, décoration, sécurité..."
                value={formulaire.secteur}
                onChange={gererChangement}
                required
              />
            </label>
          </div>

          <div className="formulaire-ligne">
            <label>
              Ville
              <input type="text" name="ville" value={formulaire.ville} onChange={gererChangement} required />
            </label>

            <label>
              Site web ou page (optionnel)
              <input
                type="url"
                name="lien"
                placeholder="https://..."
                value={formulaire.lien}
                onChange={gererChangement}
              />
            </label>
          </div>

          <label>
            Description de votre offre
            <textarea
              name="description"
              rows="3"
              value={formulaire.description}
              onChange={gererChangement}
              required
            />
          </label>

          <button type="submit" className="bouton bouton-plein">Soumettre ma publicité</button>
        </form>
      </section>

      <AdBanner pubs={[...pubsUtilisateur, ...pubsInitiales]} titre="Nos partenaires" />
    </>
  )
}

export default Publicite
