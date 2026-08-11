# TerangaVillas

Application React pour louer des villas, acheter des maisons et des
terrains au Sénégal — architecture `Pages/` + `Components/` +
`data/`, routing centralisé dans `App.js`.

## Installation

```
npm install
npm start
```

L'application démarre sur http://localhost:3000. La géolocalisation
du navigateur ne fonctionne que sur `localhost` ou en HTTPS — c'est
le cas par défaut avec `npm start` et avec un déploiement classique
(Vercel, Netlify...).

## Différentes composantes du projet

- **Carte géographique à l'accueil** (`Components/MapExplorer.js`,
  react-leaflet + OpenStreetMap, aucune clé API requise) : localise
  l'utilisateur, affiche les villas/terrains/maisons autour de lui
  avec un filtre par rayon, et une liste synchronisée à côté de la
  carte.
- **Barre de recherche plus efficace** (`Components/SearchBar.js`) :
  autocomplétion sur les villes et les noms de biens, filtres rapides
  en un clic (type, location/vente), bouton « Près de moi ».
- **Question acheteur / vendeur à chaque connexion**
  (`context/UserTypeContext.js` + `Components/AccountTypeModal.js`) :
  redemandée à chaque nouvelle session (`sessionStorage`), redirige
  un « vendeur » vers `/publier`.
- **Espace publicité pour les entrepreneurs** (`Pages/Publicite.js` +
  `Components/AdBanner.js` + `data/pubs.js`) : formulaire de dépôt de
  publicité, affichée en bandeau sur l'accueil et en repères sur la
  carte.
- **Formulaire de dépôt d'annonce** (`Pages/PublierAnnonce.js`) pour
  les vendeurs/propriétaires.
- **Thème marron & blanc avec bascule vers le noir**
  (`context/ThemeContext.js` + `Components/ThemeToggle.js`) : tokens
  CSS dans `src/index.css`, persistés en `localStorage`.

## Organisation du projet

```
src/
  data/
    biens.js          → catalogue villas/terrains/maisons, avec lat/lng
    pubs.js            → publicités des entrepreneurs partenaires

  context/
    ThemeContext.js     → thème clair/sombre (persisté)
    UserTypeContext.js  → profil acheteur/vendeur (par session)

  Components/
    Navbar.js, Footer.js, ScrollToTop.js  → présents sur toutes les pages
    MapExplorer.js                        → carte d'accueil + liste
    SearchBar.js                          → recherche avec autocomplétion
    AccountTypeModal.js                   → question acheteur/vendeur
    ThemeToggle.js                        → bouton clair/sombre
    AdBanner.js                           → bandeau de publicités
    BienCard.js, FiltreRecherche.js, CategoryTiles.js, Destinations.js,
    Stats.js, CtaBand.js                  → sections/cartes réutilisables

  Pages/
    Accueil.js       → carte + sections vitrine
    Listing.js        → liste filtrable (/villas, /terrains, /maisons, /recherche)
    BienDetail.js      → route dynamique /villas|terrains|maisons/:id
    Publicite.js        → dépôt de publicité entrepreneurs
    PublierAnnonce.js    → dépôt d'annonce vendeurs
    APropos.js, Contact.js, NonTrouvee.js
```

## Limites  (pas de backend)

Toutes les données viennent de `src/data/`. Les formulaires
(annonce, publicité, contact) simulent un envoi — rien n'est stocké
côté serveur. La page Publicité garde un aperçu dans le navigateur
(`localStorage`).
