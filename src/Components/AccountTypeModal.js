import { useNavigate } from 'react-router-dom'
import { useUserType } from '../context/UserTypeContext'
import './AccountTypeModal.css'

/**
 * Affichée à chaque nouvelle connexion (voir UserTypeContext).
 * Le choix personnalise la suite : un vendeur est redirigé vers
 * le formulaire de publication, un acheteur reste sur la carte
 * pour explorer les biens autour de lui.
 */
function AccountTypeModal() {
  const { modalOuverte, definirProfil, setModalOuverte } = useUserType()
  const navigate = useNavigate()

  if (!modalOuverte) return null

  function choisir(profil) {
    definirProfil(profil)
    if (profil === 'vendeur') {
      navigate('/publier')
    }
  }

  return (
    <div className="modal-fond" role="dialog" aria-modal="true">
      <div className="modal-carte">
        <button
          type="button"
          className="modal-fermer"
          aria-label="Fermer"
          onClick={() => setModalOuverte(false)}
        >
          ✕
        </button>

        <p className="modal-eyebrow">Bienvenue sur TerangaVillas</p>
        <h2>Vous êtes plutôt...</h2>
        <p className="modal-texte">
          Dites-nous ce qui vous amène aujourd'hui, on adapte votre expérience en conséquence.
        </p>

        <div className="modal-choix">
          <button type="button" className="modal-choix-carte" onClick={() => choisir('acheteur')}>
            <span className="modal-choix-icone">🔎</span>
            <span className="modal-choix-titre">Je cherche</span>
            <span className="modal-choix-texte">Louer une villa ou acheter un terrain / une maison</span>
          </button>

          <button type="button" className="modal-choix-carte" onClick={() => choisir('vendeur')}>
            <span className="modal-choix-icone">🏡</span>
            <span className="modal-choix-titre">Je propose un bien</span>
            <span className="modal-choix-texte">Publier ma villa, mon terrain ou ma maison</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccountTypeModal
