import './Stats.css'

const chiffres = [
  { valeur: '20+', libelle: 'biens vérifiés sur le site' },
  { valeur: '10', libelle: 'villes couvertes au Sénégal' },
  { valeur: '3', libelle: 'catégories : villas, terrains, maisons' },
  { valeur: '48h', libelle: 'délai de réponse moyen' },
]

function Stats() {
  return (
    <section className="stats section">
      <div className="conteneur stats-grille">
        {chiffres.map((chiffre) => (
          <div key={chiffre.libelle} className="stats-item">
            <p className="stats-valeur">{chiffre.valeur}</p>
            <p className="stats-libelle">{chiffre.libelle}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
