// Publicités d'entrepreneurs locaux (démo, pas d'API). Chaque pub
// peut être affichée sous forme de bannière (AdBanner) et, quand
// elle a des coordonnées, comme repère "Pub" sur la carte d'accueil.

const pubs = [
  {
    id: 'pub-demenagement-teranga',
    entreprise: 'Teranga Déménagement',
    secteur: 'Déménagement',
    ville: 'Dakar',
    lat: 14.6928,
    lng: -17.4467,
    description:
      "Déménagement et transport de meubles dans tout Dakar et la Petite Côte, devis gratuit sous 24h.",
    lien: '#',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZZcQsOwKfg5GC2ij0ipLuvIWiDx_zKVU97bOfeoJJxg&s=10',
  },
  {
    id: 'pub-decoration-baobab',
    entreprise: 'Baobab Déco',
    secteur: 'Décoration d’intérieur',
    ville: 'Saly',
    lat: 14.4573,
    lng: -17.0094,
    description:
      'Décoration et ameublement pour villas de vacances : style local, artisanat et matériaux durables.',
    lien: '#',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUpzjgfmpEZLwgyR0mQX3R9_IuV-MeTgziqrvMo-vztw&s=10',
  },
  {
    id: 'pub-securite-sahel',
    entreprise: 'Sahel Sécurité',
    secteur: 'Gardiennage & sécurité',
    ville: "M'bour",
    lat: 14.4230,
    lng: -16.9660,
    description:
      'Gardiennage de villas et terrains, télésurveillance et agents formés, contrats courte ou longue durée.',
    lien: '#',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFu1mgHe9pNSLtbtB1X8UddRcfdzo4O3JZgPCY3w5J6w&s=10',
  },
  {
    id: 'pub-notaire-almadies',
    entreprise: 'Étude Notariale des Almadies',
    secteur: 'Notaire & foncier',
    ville: 'Dakar',
    lat: 14.7440,
    lng: -17.5130,
    description:
      'Accompagnement juridique pour l’achat de terrains et maisons : vérification de titres, actes de vente.',
    lien: '#',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCWWmDwppFAigPaCOUmr_OP-HSL_RD1cb1o0xOyKbZ3Q&s=10',
  },
]

export default pubs
