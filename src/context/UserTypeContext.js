import { createContext, useContext, useEffect, useState } from 'react'

const UserTypeContext = createContext(null)

const CLE_SESSION = 'teranga-profil-session'

/**
 * On redemande le profil (acheteur / vendeur) à chaque nouvelle
 * connexion, c'est-à-dire à chaque ouverture de l'application —
 * sessionStorage se vide quand l'onglet/l'app est fermé, contrairement
 * à localStorage qui aurait mémorisé le choix indéfiniment.
 */
export function UserTypeProvider({ children }) {
  const [profil, setProfilState] = useState(null)
  const [modalOuverte, setModalOuverte] = useState(false)

  useEffect(() => {
    const enregistre = window.sessionStorage.getItem(CLE_SESSION)
    if (enregistre === 'acheteur' || enregistre === 'vendeur') {
      setProfilState(enregistre)
      setModalOuverte(false)
    } else {
      setModalOuverte(true)
    }
  }, [])

  function definirProfil(valeur) {
    setProfilState(valeur)
    window.sessionStorage.setItem(CLE_SESSION, valeur)
    setModalOuverte(false)
  }

  function changerDeProfil() {
    setModalOuverte(true)
  }

  return (
    <UserTypeContext.Provider value={{ profil, modalOuverte, definirProfil, changerDeProfil, setModalOuverte }}>
      {children}
    </UserTypeContext.Provider>
  )
}

export function useUserType() {
  return useContext(UserTypeContext)
}
