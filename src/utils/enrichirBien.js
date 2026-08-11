// Génère, de façon déterministe (toujours le même résultat pour un
// même bien), les informations détaillées qui ne sont pas dans
// data/biens.js : galerie de photos par pièce, avis clients,
// disponibilité, et pour les terrains, statut juridique / documents
// / avantages. Le jour où une vraie API existe, cette fonction est
// remplacée par les données qu'elle renvoie.

function hash(texte) {
  let h = 0
  for (let i = 0; i < texte.length; i++) {
    h = (h * 31 + texte.charCodeAt(i)) >>> 0
  }
  return h
}

function choisirUn(pool, seed) {
  return pool[hash(seed) % pool.length]
}

function choisirPlusieurs(pool, seed, n) {
  const h = hash(seed)
  const depart = h % pool.length
  const resultat = []
  const utilises = new Set()
  let i = 0
  while (resultat.length < n && utilises.size < pool.length) {
    const candidat = pool[(depart + i) % pool.length]
    if (!utilises.has(candidat)) {
      utilises.add(candidat)
      resultat.push(candidat)
    }
    i++
  }
  return resultat
}

// Vraies photos libres de droits (Pexels), triées par pièce/thème —
// remplace les images Picsum, qui renvoyaient un cliché totalement
// aléatoire sans rapport avec une villa. Chaque bien pioche, de façon
// déterministe, dans le pool correspondant à chaque pièce, ce qui
// donne une photo différente d'un bien à l'autre tout en restant
// toujours une vraie photo de la bonne pièce.
function pexels(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`
}

const PHOTOS_CHAMBRE = [33837741, 18254581, 31737843, 8135502, 18285949, 6207825, 20439293, 18285941].map(pexels)
const PHOTOS_SALLE_DE_BAIN = [18246436, 33829528, 16113325, 8089093, 19846350, 7045358, 6920614, 7031565].map(pexels)
const PHOTOS_CUISINE = [4713242, 6035312, 18285887, 10099318, 35189706, 29923543].map(pexels)
const PHOTOS_SALON = [31817155, 4857757, 6035357, 19836798, 10168692, 20390760].map(pexels)
const PHOTOS_PISCINE = [17556197, 1746876, 5563469, 29453302].map(pexels)
const PHOTOS_TERRAIN = [8322786, 1101103, 6115818, 753869, 8754407, 13525086, 12066744].map(pexels)

function photosVillaOuMaison(bien) {
  const pieces = [
    { label: 'Extérieur', url: bien.image },
    { label: 'Salon', url: choisirUn(PHOTOS_SALON, `${bien.id}-salon`) },
  ]
  if (bien.chambres >= 1) {
    pieces.push({ label: 'Chambre principale', url: choisirUn(PHOTOS_CHAMBRE, `${bien.id}-ch1`) })
  }
  if (bien.chambres >= 2) {
    pieces.push({ label: 'Chambre 2', url: choisirUn(PHOTOS_CHAMBRE, `${bien.id}-ch2`) })
  }
  if (bien.chambres >= 3) {
    pieces.push({ label: 'Chambre 3', url: choisirUn(PHOTOS_CHAMBRE, `${bien.id}-ch3`) })
  }
  pieces.push({ label: 'Salle de bain', url: choisirUn(PHOTOS_SALLE_DE_BAIN, `${bien.id}-sdb`) })
  pieces.push({ label: 'Cuisine', url: choisirUn(PHOTOS_CUISINE, `${bien.id}-cuisine`) })
  if (bien.piscine) {
    pieces.push({ label: 'Piscine', url: choisirUn(PHOTOS_PISCINE, `${bien.id}-piscine`) })
  }
  return pieces
}

function photosTerrain(bien) {
  const angles = ['Vue générale', 'Entrée / accès', 'Vue aérienne', 'Bornage']
  const photos = choisirPlusieurs(PHOTOS_TERRAIN, `${bien.id}-terrain`, angles.length)
  return angles.map((angle, i) => ({
    label: angle,
    // la 1ʳᵉ photo ("Vue générale") est la vraie photo du terrain
    // déjà choisie pour la page d'accueil ; les autres angles piochent
    // dans un pool de vraies photos de terrains/parcelles.
    url: i === 0 ? bien.image : photos[i],
  }))
}

const NOMS_AVIS = [
  'Awa D.', 'Moussa S.', 'Fatou N.', 'Ibrahima L.', 'Sokhna F.',
  'Cheikh T.', 'Aminata B.', 'Ousmane K.', 'Mariam G.', 'Babacar C.',
]

const COMMENTAIRES_LOCATION = [
  "Séjour parfait, l'endroit est encore plus beau qu'en photo.",
  'Accueil chaleureux et logement très propre, on reviendra.',
  'Bien situé, calme le soir, exactement ce qu\'il nous fallait.',
  "Quelques petits détails à améliorer mais globalement top.",
  'Le rapport qualité-prix est excellent pour la zone.',
]

const COMMENTAIRES_VENTE = [
  'Visite très professionnelle, toutes nos questions ont eu une réponse.',
  'Dossier clair, on a pu avancer vite sur la transaction.',
  "Bien conforme à la description, aucune mauvaise surprise.",
  'Quartier agréable, on recommande ce bien sans hésiter.',
  'Négociation simple, vendeur réactif.',
]

const AVANTAGES_TERRAIN = [
  "Terrain d'angle",
  'En bordure de boulevard',
  'Assainissement disponible',
  'Électricité à proximité',
  'Eau courante à proximité',
  'Terrain clôturé',
  'Accès bitumé',
  'Proche axe principal',
]

const STATUTS_JURIDIQUES = [
  {
    statut: 'Titre foncier',
    documents: ['Titre foncier', 'Plan de bornage', 'Certificat de non-gage'],
  },
  {
    statut: 'Bail emphytéotique',
    documents: ['Contrat de bail', 'Plan de situation'],
  },
  {
    statut: 'Délibération municipale',
    documents: ['Délibération municipale', 'Plan cadastral'],
  },
]

function avisPour(bien) {
  const pool = bien.transaction === 'vente' ? COMMENTAIRES_VENTE : COMMENTAIRES_LOCATION
  const noms = choisirPlusieurs(NOMS_AVIS, `${bien.id}-noms`, 3)
  const commentaires = choisirPlusieurs(pool, `${bien.id}-avis`, 3)
  const h = hash(bien.id)
  return noms.map((auteur, i) => ({
    auteur,
    note: Math.min(10, Math.max(6, bien.note + (((h >> (i * 3)) % 5) - 2) * 0.3)).toFixed(1),
    commentaire: commentaires[i],
  }))
}

export function enrichirBien(bien) {
  const h = hash(bien.id)
  const disponible = h % 5 !== 0 // 80% des biens affichés comme disponibles

  if (bien.type === 'terrain') {
    const juridique = choisirUn(STATUTS_JURIDIQUES, `${bien.id}-statut`)
    const avantages = choisirPlusieurs(AVANTAGES_TERRAIN, `${bien.id}-avantages`, 3 + (h % 2))
    return {
      photos: photosTerrain(bien),
      disponible,
      statutJuridique: juridique.statut,
      documents: juridique.documents,
      avantages,
    }
  }

  return {
    photos: photosVillaOuMaison(bien),
    disponible,
    avisListe: avisPour(bien),
  }
}
