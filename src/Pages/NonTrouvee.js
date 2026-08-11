import { Link } from 'react-router-dom'

function NonTrouvee() {
  return (
    <section className="section conteneur" style={{ textAlign: 'center' }}>
      <p className="section-titre-eyebrow">Erreur 404</p>
      <h1>Cette page n'existe pas</h1>
      <p>Le lien est peut-être incorrect ou la villa n'existe plus.</p>
      <Link to="/" className="bouton bouton-plein">Retour à l'accueil</Link>
    </section>
  )
}

export default NonTrouvee
