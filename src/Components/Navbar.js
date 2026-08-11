import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import './Navbar.css'

function Navbar() {
  const [menuOuvert, setMenuOuvert] = useState(false)

  return (
    <header className="navbar">
      <div className="conteneur navbar-interieur">
        <Link to="/" className="navbar-logo">
          Teranga<span>Villas</span>
        </Link>

        <div className="navbar-mobile-actions">
          <ThemeToggle />
          <button
            className="navbar-burger"
            onClick={() => setMenuOuvert((v) => !v)}
            aria-label="Ouvrir le menu"
          >
            ☰
          </button>
        </div>

        <nav className={`navbar-liens ${menuOuvert ? 'navbar-liens--ouvert' : ''}`}>
          <NavLink to="/" end className="navbar-lien" onClick={() => setMenuOuvert(false)}>
            Accueil
          </NavLink>
          <NavLink to="/villas" className="navbar-lien" onClick={() => setMenuOuvert(false)}>
            Villas à louer
          </NavLink>
          <NavLink to="/terrains" className="navbar-lien" onClick={() => setMenuOuvert(false)}>
            Terrains
          </NavLink>
          <NavLink to="/maisons" className="navbar-lien" onClick={() => setMenuOuvert(false)}>
            Maisons à vendre
          </NavLink>
          <NavLink to="/publicite" className="navbar-lien" onClick={() => setMenuOuvert(false)}>
            Publicité
          </NavLink>
          <NavLink to="/a-propos" className="navbar-lien" onClick={() => setMenuOuvert(false)}>
            À propos
          </NavLink>
          <NavLink to="/contact" className="navbar-lien" onClick={() => setMenuOuvert(false)}>
            Contact
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <Link to="/publier" className="bouton bouton-contour navbar-bouton-connexion">
            Publier une annonce
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
