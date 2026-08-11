import { useState } from 'react'
import './ReservationModal.css'

const MOYENS_PAIEMENT = [
  { id: 'wave', libelle: 'Wave', description: 'Paiement mobile Wave' },
  { id: 'orange-money', libelle: 'Orange Money', description: 'Paiement mobile Orange Money' },
  { id: 'paypal', libelle: 'PayPal', icone: '🅿️', description: 'Compte ou carte via PayPal' },
  { id: 'carte', libelle: 'Carte bancaire', icone: '💳', description: 'Visa, Mastercard...' },
]

/**
 * Fenêtre de réservation : choix du moyen de paiement puis
 * confirmation. Aucun vrai paiement n'est effectué (pas de backend
 * ni d'intégration Wave/Orange Money/PayPal réelle) — c'est une
 * démonstration du parcours, à brancher plus tard sur de vraies
 * API de paiement.
 */
function ReservationModal({ bien, prixLibelle, onFermer }) {
  const [moyenChoisi, setMoyenChoisi] = useState(null)
  const [etape, setEtape] = useState('choix') // choix | confirmation

  function confirmer(moyen) {
    setMoyenChoisi(moyen)
    setEtape('confirmation')
  }

  return (
    <div className="modal-fond" role="dialog" aria-modal="true" onClick={onFermer}>
      <div className="modal-carte reservation-carte" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-fermer" aria-label="Fermer" onClick={onFermer}>
          ✕
        </button>

        {etape === 'choix' && (
          <>
            <p className="modal-eyebrow">Réservation</p>
            <h2>{bien.nom}</h2>
            <p className="modal-texte">
              {prixLibelle} — choisissez votre moyen de paiement pour continuer.
            </p>

            <div className="reservation-moyens">
              {MOYENS_PAIEMENT.map((moyen) => (
                <button
                  key={moyen.id}
                  type="button"
                  className="reservation-moyen"
                  onClick={() => confirmer(moyen)}
                >
                  <span className="reservation-moyen-icone">{moyen.icone}</span>
                  <span>
                    <span className="reservation-moyen-libelle">{moyen.libelle}</span>
                    <span className="reservation-moyen-description">{moyen.description}</span>
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {etape === 'confirmation' && moyenChoisi && (
          <div className="reservation-confirmation">
            <span className="reservation-confirmation-icone">{moyenChoisi.icone}</span>
            <p className="modal-eyebrow">Demande envoyée</p>
            <h2>Paiement via {moyenChoisi.libelle}</h2>
            <p className="modal-texte">
              {moyenChoisi.id === 'wave' || moyenChoisi.id === 'orange-money'
                ? `Vous allez recevoir une demande de paiement ${moyenChoisi.libelle} sur votre téléphone pour confirmer votre réservation de « ${bien.nom} ».`
                : `Vous allez être redirigé vers ${moyenChoisi.libelle} pour finaliser le paiement de votre réservation de « ${bien.nom} ».`}
            </p>
            <p className="formulaire-note">
              Démonstration — aucun paiement réel n'est effectué ici.
            </p>
            <button type="button" className="bouton bouton-plein" onClick={onFermer}>
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReservationModal
