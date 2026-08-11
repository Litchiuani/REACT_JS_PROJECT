import MapExplorer from '../Components/MapExplorer'
import Stats from '../Components/Stats'
import CategoryTiles from '../Components/CategoryTiles'
import Destinations from '../Components/Destinations'
import BienCard from '../Components/BienCard'
import AdBanner from '../Components/AdBanner'
import CtaBand from '../Components/CtaBand'
import pubs from '../data/pubs'

function Accueil({ biens }) {
  const villas = biens.filter((b) => b.type === 'villa').slice(0, 4)
  const terrains = biens.filter((b) => b.type === 'terrain').slice(0, 4)
  const maisons = biens.filter((b) => b.type === 'maison').slice(0, 4)

  return (
    <>
      <MapExplorer />

      <Stats />

      <CategoryTiles />

      <AdBanner pubs={pubs} />

      <section className="section conteneur">
        <div className="section-entete">
          <div>
            <p className="section-titre-eyebrow">Location</p>
            <h2>Villas les plus demandées</h2>
            <p className="section-soustitre">Piscine, plage à pied, ou les deux.</p>
          </div>
          <a href="/villas" className="voir-tout">Voir toutes les villas →</a>
        </div>
        <div className="bien-grille">
          {villas.map((bien) => (
            <BienCard key={bien.id} bien={bien} />
          ))}
        </div>
      </section>

      <Destinations />

      <section className="section conteneur">
        <div className="section-entete">
          <div>
            <p className="section-titre-eyebrow">Terrains</p>
            <h2>À louer ou à acheter</h2>
            <p className="section-soustitre">Pour un événement, un projet agricole ou construire.</p>
          </div>
          <a href="/terrains" className="voir-tout">Voir tous les terrains →</a>
        </div>
        <div className="bien-grille">
          {terrains.map((bien) => (
            <BienCard key={bien.id} bien={bien} />
          ))}
        </div>
      </section>

      <section className="section conteneur">
        <div className="section-entete">
          <div>
            <p className="section-titre-eyebrow">Vente</p>
            <h2>Maisons à vendre</h2>
            <p className="section-soustitre">Pour investir ou vous installer durablement.</p>
          </div>
          <a href="/maisons" className="voir-tout">Voir toutes les maisons →</a>
        </div>
        <div className="bien-grille">
          {maisons.map((bien) => (
            <BienCard key={bien.id} bien={bien} />
          ))}
        </div>
      </section>

      <CtaBand
        titre="Vous ne trouvez pas ce qu'il vous faut ?"
        texte="Décrivez-nous votre recherche — ville, budget, type de bien — et nous vous proposons des options sous 48h."
        lienPrincipal={{ libelle: 'Nous contacter', to: '/contact' }}
        lienSecondaire={{ libelle: 'Voir toutes les annonces', to: '/recherche' }}
      />
    </>
  )
}

export default Accueil
