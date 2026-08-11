import { useTheme } from '../context/ThemeContext'
import './ThemeToggle.css'

function ThemeToggle() {
  const { theme, basculerTheme } = useTheme()
  const estSombre = theme === 'sombre'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={basculerTheme}
      aria-label={estSombre ? 'Activer le thème clair' : 'Activer le thème sombre'}
      title={estSombre ? 'Passer en blanc' : 'Passer en noir'}
    >
      <span className="theme-toggle-icone">{estSombre ? '☀️' : '🌙'}</span>
      <span className="theme-toggle-libelle">{estSombre ? 'Clair' : 'Sombre'}</span>
    </button>
  )
}

export default ThemeToggle
