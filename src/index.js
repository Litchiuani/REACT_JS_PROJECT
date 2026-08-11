import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* BrowserRouter englobe toute l'app : c'est lui qui donne
        accès à <Routes>, <Route> et <Link> partout en dessous. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
