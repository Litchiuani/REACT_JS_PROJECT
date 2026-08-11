import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import BienCard from '../Components/BienCard'
import FiltreRecherche from '../Components/FiltreRecherche'
import { TYPES } from '../data/biens'

/**
 * Page de listing générique, réutilisée pour /villas, /terrains,
 * /maisons et /recherche. typeFixe fige la catégorie (on masque
 * alors le sélecteur de type) ; sur /recherche, typeFixe est null
 * et on lit les critères initiaux depuis l'URL (venant de la
 * SearchBar ou des tuiles Destinations).
 */
function Listing({ biens, typeFixe, titre, description }) {
  const [searchParams] = useSearchParams()

  const [filtre, setFiltre] = useState({
    recherche: searchParams.get('q') || '',
    type: typeFixe || searchParams.get('type') || 'tous',
    transaction: searchParams.get('transaction') || 'tous',
    piscineUniquement: false,
  })

  useEffect(() => {
    setFiltre((f) => ({
      ...f,
      recherche: searchParams.get('q') || '',
      type: typeFixe || searchParams.get('type') || 'tous',
      transaction: searchParams.get('transaction') || 'tous',
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, typeFixe])

  const biensFiltres = biens.filter((bien) => {
    const correspondType = typeFixe
      ? bien.type === typeFixe
      : filtre.type === 'tous' || bien.type === filtre.type
    const correspondTransaction =
      filtre.transaction === 'tous' || bien.transaction === filtre.transaction
    const correspondVille = bien.ville.toLowerCase().includes(filtre.recherche.toLowerCase())
    const correspondPiscine = !filtre.piscineUniquement || bien.piscine
    return correspondType && correspondTransaction && correspondVille && correspondPiscine
  })

  return (
    <section className="section conteneur">
      <p className="section-titre-eyebrow">{typeFixe ? TYPES[typeFixe].libelle : 'Catalogue'}</p>
      <h1>{titre}</h1>
      {description && <p className="section-soustitre" style={{ marginBottom: '1.5rem' }}>{description}</p>}

      <FiltreRecherche filtre={filtre} onFiltreChange={setFiltre} afficherType={!typeFixe} />

      <p style={{ color: 'var(--couleur-texte-doux)', marginTop: '-0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
        {biensFiltres.length} résultat{biensFiltres.length > 1 ? 's' : ''}
      </p>

      {biensFiltres.length === 0 ? (
        <p>Aucun bien ne correspond à cette recherche.</p>
      ) : (
        <div className="bien-grille">
          {biensFiltres.map((bien) => (
            <BienCard key={bien.id} bien={bien} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Listing
