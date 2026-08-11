import { Link } from 'react-router-dom'
import './Footer.css'

const colonnes = [
  {
    titre: 'Nos biens',
    liens: [
      { libelle: 'Villas à louer', to: '/villas' },
      { libelle: 'Terrains', to: '/terrains' },
      { libelle: 'Maisons à vendre', to: '/maisons' },
      { libelle: 'Toutes les annonces', to: '/recherche' },
    ],
  },
  {
    titre: 'À propos',
    liens: [
      { libelle: 'Notre histoire', to: '/a-propos' },
      { libelle: 'Comment ça marche', to: '/a-propos' },
      { libelle: 'Contact', to: '/contact' },
    ],
  },
  {
    titre: 'Assistance',
    liens: [
      { libelle: 'Centre d’aide', to: '/contact' },
      { libelle: 'Publier une annonce', to: '/contact' },
      { libelle: 'Signaler un problème', to: '/contact' },
    ],
  },
]

function Footer() {
  const annee = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="conteneur footer-grille">
        <div className="footer-marque">
          <p className="footer-logo">
            Teranga<span>Villas</span>
          </p>
          <p className="footer-baseline">
            Villas, terrains et maisons au Sénégal — location et vente,
            sélection vérifiée.
          </p>
        </div>

        {colonnes.map((col) => (
          <div key={col.titre} className="footer-colonne">
            <h4>{col.titre}</h4>
            <nav>
              {col.liens.map((lien) => (
                <Link key={lien.libelle} to={lien.to}>
                  {lien.libelle}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="conteneur footer-bas">
        <p>© {annee} TerangaVillas — Location et vente de biens au Sénégal</p>
      </div>
    </footer>
  )
}

export default Footer
