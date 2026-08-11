import './FiltreRecherche.css'

/**
 * Composant contrôlé : il ne garde aucun état lui-même. La valeur
 * affichée (filtre) et la fonction pour la changer (onFiltreChange)
 * viennent toutes les deux du parent (page Listing). afficherType
 * permet de masquer le sélecteur de type sur les pages déjà
 * dédiées à une catégorie (ex: /villas).
 */
function FiltreRecherche({ filtre, onFiltreChange, afficherType = true }) {
  return (
    <div className="filtre">
      <input
        type="text"
        placeholder="Rechercher une ville (Saly, Ngor, Dakar...)"
        value={filtre.recherche}
        onChange={(e) => onFiltreChange({ ...filtre, recherche: e.target.value })}
        className="filtre-champ"
      />

      {afficherType && (
        <select
          className="filtre-select"
          value={filtre.type}
          onChange={(e) => onFiltreChange({ ...filtre, type: e.target.value })}
        >
          <option value="tous">Tous les types</option>
          <option value="villa">Villas</option>
          <option value="terrain">Terrains</option>
          <option value="maison">Maisons</option>
        </select>
      )}

      <select
        className="filtre-select"
        value={filtre.transaction}
        onChange={(e) => onFiltreChange({ ...filtre, transaction: e.target.value })}
      >
        <option value="tous">Louer ou acheter</option>
        <option value="location">À louer</option>
        <option value="vente">À vendre</option>
      </select>

      <label className="filtre-checkbox">
        <input
          type="checkbox"
          checked={filtre.piscineUniquement}
          onChange={(e) =>
            onFiltreChange({ ...filtre, piscineUniquement: e.target.checked })
          }
        />
        Avec piscine uniquement
      </label>
    </div>
  )
}

export default FiltreRecherche
