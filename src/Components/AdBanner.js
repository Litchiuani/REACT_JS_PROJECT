import { Link } from 'react-router-dom'
import './AdBanner.css'

function AdBanner({ pubs, titre = 'Nos partenaires près de chez vous' }) {
  if (!pubs || pubs.length === 0) return null

  return (
    <section className="section conteneur">
      <div className="section-entete">
        <div>
          <p className="section-titre-eyebrow">Publicité</p>
          <h2>{titre}</h2>
          <p className="section-soustitre">Des entrepreneurs sénégalais au service de votre projet immobilier.</p>
        </div>
        <Link to="/publicite" className="voir-tout">Devenir partenaire →</Link>
      </div>

      <div className="pub-bandeau">
        {pubs.map((pub) => (
          <a
            key={pub.id}
            href={pub.lien}
            target="_blank"
            rel="noopener noreferrer"
            className="pub-carte"
          >
            <div className="pub-carte-image" style={{ backgroundImage: `url(${pub.image})` }}>
              <span className="pub-carte-badge">Sponsorisé</span>
            </div>
            <div className="pub-carte-corps">
              <p className="pub-carte-secteur">{pub.secteur} · {pub.ville}</p>
              <h3>{pub.entreprise}</h3>
              <p className="pub-carte-texte">{pub.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default AdBanner
