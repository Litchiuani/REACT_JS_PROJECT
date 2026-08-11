import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Sans ce composant, changer de page avec React Router garde la
 * position de scroll de la page précédente. On force le retour en
 * haut à chaque changement de route.
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
