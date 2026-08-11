import { Link } from 'react-router-dom'
import './CtaBand.css'

function CtaBand({ titre, texte, lienPrincipal, lienSecondaire }) {
  return (
    <section className="cta-band">
      <div className="conteneur cta-band-interieur">
        <div>
          <h2>{titre}</h2>
          <p>{texte}</p>
        </div>
        <div className="cta-band-actions">
          <Link to={lienPrincipal.to} className="bouton bouton-plein">
            {lienPrincipal.libelle}
          </Link>
          {lienSecondaire && (
            <Link to={lienSecondaire.to} className="bouton bouton-contour cta-contour-inverse">
              {lienSecondaire.libelle}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default CtaBand
