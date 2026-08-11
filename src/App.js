import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import ScrollToTop from './Components/ScrollToTop'
import AccountTypeModal from './Components/AccountTypeModal'
import { ThemeProvider } from './context/ThemeContext'
import { UserTypeProvider } from './context/UserTypeContext'
import Accueil from './Pages/Accueil'
import Listing from './Pages/Listing'
import BienDetail from './Pages/BienDetail'
import Publicite from './Pages/Publicite'
import PublierAnnonce from './Pages/PublierAnnonce'
import APropos from './Pages/APropos'
import Contact from './Pages/Contact'
import NonTrouvee from './Pages/NonTrouvee'
import biens from './data/biens'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <UserTypeProvider>
        <div className="app-shell">
          {/* Navbar et Footer sont HORS des routes : ils restent affichés
              quelle que soit la page. Seul <main> change de contenu. */}
          <Navbar />
          <ScrollToTop />
          <AccountTypeModal />

          <main className="app-main">
            <Routes>
              <Route path="/" element={<Accueil biens={biens} />} />

              <Route
                path="/villas"
                element={
                  <Listing
                    biens={biens}
                    typeFixe="villa"
                    titre="Villas à louer"
                    description="Pour vos vacances en famille ou entre amis, avec ou sans piscine."
                  />
                }
              />
              <Route path="/villas/:id" element={<BienDetail biens={biens} typeAttendu="villa" />} />

              <Route
                path="/terrains"
                element={
                  <Listing
                    biens={biens}
                    typeFixe="terrain"
                    titre="Terrains"
                    description="À louer pour un événement ou un projet, ou à acheter pour construire."
                  />
                }
              />
              <Route path="/terrains/:id" element={<BienDetail biens={biens} typeAttendu="terrain" />} />

              <Route
                path="/maisons"
                element={
                  <Listing
                    biens={biens}
                    typeFixe="maison"
                    titre="Maisons à vendre"
                    description="Pour investir ou vous installer durablement au Sénégal."
                  />
                }
              />
              <Route path="/maisons/:id" element={<BienDetail biens={biens} typeAttendu="maison" />} />

              <Route
                path="/recherche"
                element={
                  <Listing
                    biens={biens}
                    typeFixe={null}
                    titre="Résultats de recherche"
                    description="Villas, terrains et maisons correspondant à vos critères."
                  />
                }
              />

              <Route path="/publicite" element={<Publicite />} />
              <Route path="/publier" element={<PublierAnnonce />} />

              <Route path="/a-propos" element={<APropos />} />
              <Route path="/contact" element={<Contact />} />

              {/* * = toutes les adresses non définies ci-dessus */}
              <Route path="*" element={<NonTrouvee />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </UserTypeProvider>
    </ThemeProvider>
  )
}

export default App
