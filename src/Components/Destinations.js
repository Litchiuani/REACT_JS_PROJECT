import { Link } from 'react-router-dom'
import './Destinations.css'

const destinations = [
  { ville: 'Dakar', biens: 6, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGRp5nYpyt2bp18zDzfq_3t5Dheip5R47tcyejnZziMw&s=10' },
  { ville: 'Saly', biens: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjqxBCPPji_lLjAvKmvwsk-70Z8Rxz4IlwI1aF4SW4-g&s=10' },
  { ville: 'Ngor', biens: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMi7Z2iOWexGkEsgay4QFDGvEYzi3JXHoXZ4VguKur9A&s=10' },
  { ville: 'La Somone', biens: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYd18YYr7lp-BPCKmy87f45sTvMfUYNghAJoqiAXDnZA&s=10' },
  { ville: "M'bour", biens: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyxJoUhixUdmfmCQuKj5Y96EUHw-nM2TcgZRa2JaH_9A&s=10' },
  { ville: 'Ngaparou', biens: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKjRXhUraU9jUbnPFmRp5C7UfeKow8I0BpnFUiSI0NJg&s=10' },
]

function Destinations() {
  return (
    <section className="section conteneur">
      <p className="section-titre-eyebrow">Destinations en vogue</p>
      <h2>Où chercher en premier</h2>
      <div className="destinations-grille">
        {destinations.map((d) => (
          <Link
            to={`/recherche?q=${encodeURIComponent(d.ville)}`}
            key={d.ville}
            className="destination-carte"
          >
            <div
              className="destination-carte-image"
              style={{ backgroundImage: `url(${d.image})` }}
            />
            <div className="destination-carte-texte">
              <h3>{d.ville}</h3>
              <p>{d.biens} biens disponibles</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Destinations
