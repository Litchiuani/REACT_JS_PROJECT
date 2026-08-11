import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formulaire, setFormulaire] = useState({ nom: '', email: '', message: '' })
  const [envoye, setEnvoye] = useState(false)

  function gererChangement(e) {
    const { name, value } = e.target
    setFormulaire((precedent) => ({ ...precedent, [name]: value }))
  }

  function gererEnvoi(e) {
    e.preventDefault()
    // Pas de backend pour l'instant : on simule juste la confirmation.
    setEnvoye(true)
  }

  if (envoye) {
    return (
      <section className="section conteneur">
        <h1>Message envoyé</h1>
        <p>Merci {formulaire.nom || ''}, nous revenons vers vous sous 48h.</p>
      </section>
    )
  }

  return (
    <section className="section conteneur contact-page">
      <p className="section-titre-eyebrow">Contact</p>
      <h1>Parlons de votre séjour</h1>

      <form onSubmit={gererEnvoi} className="contact-formulaire">
        <label>
          Nom
          <input
            type="text"
            name="nom"
            value={formulaire.nom}
            onChange={gererChangement}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formulaire.email}
            onChange={gererChangement}
            required
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            rows="4"
            value={formulaire.message}
            onChange={gererChangement}
            required
          />
        </label>

        <button type="submit" className="bouton bouton-plein">Envoyer</button>
      </form>
    </section>
  )
}

export default Contact
