import { Link } from 'react-router-dom'
import './CategoryTiles.css'

const categories = [
  {
    to: '/villas',
    titre: 'Villas à louer',
    texte: 'Séjours vacances, piscine, plage à pied',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSasWszj4hVbTDRcIWDXMrOkJQbq2sWQPZVndzmC6n4FA&s=10',
  },
  {
    to: '/terrains',
    titre: 'Terrains',
    texte: 'À louer ou à acheter, viabilisés ou nus',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYIymOF7l_5H6eRlDsqqIT8qnF0nWFQ7TX1qZ_tQGikg&s=10',
  },
  {
    to: '/maisons',
    titre: 'Maisons à vendre',
    texte: 'Pour investir ou vous installer durablement',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcZHahr6IMPKv69qWvn5d6C4FrVXyi2bYlguGwCHnLpg&s=10',
  },
]

function CategoryTiles() {
  return (
    <section className="section conteneur">
      <p className="section-titre-eyebrow">Nos catégories</p>
      <h2>Que recherchez-vous ?</h2>
      <div className="categories-grille">
        {categories.map((c) => (
          <Link to={c.to} key={c.to} className="categorie-tuile">
            <div
              className="categorie-tuile-image"
              style={{ backgroundImage: `url(${c.image})` }}
            />
            <div className="categorie-tuile-texte">
              <h3>{c.titre}</h3>
              <p>{c.texte}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoryTiles
