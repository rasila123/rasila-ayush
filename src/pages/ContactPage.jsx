import Footer from '../components/Footer'
import './ContactPage.css'

const ADDRESS = 'A-5 Sarovar Plaza, Phalka Bazaar, Lashkar, Gwalior 474001'
const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`

const CONNECT_LINKS = [
  { name: 'WhatsApp', url: 'https://wa.me/919826579100', icon: 'https://cdn.simpleicons.org/whatsapp/25D366' },
  { name: 'Call', url: 'tel:+919826579100', icon: 'call', iconColor: '#0ea5e9' },
  { name: 'Facebook', url: 'https://facebook.com', icon: 'https://cdn.simpleicons.org/facebook/1877F2' },
  { name: 'Instagram', url: 'https://instagram.com', icon: 'https://cdn.simpleicons.org/instagram/E4405F' },
  { name: 'YouTube', url: 'https://youtube.com', icon: 'https://cdn.simpleicons.org/youtube/FF0000' },
  { name: 'Spotify', url: 'https://spotify.com', icon: 'https://cdn.simpleicons.org/spotify/1DB954' },
]

function CallIcon({ color = '#0ea5e9' }) {
  return (
    <svg className="contact-connect-icon" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  )
}

export default function ContactPage() {
  return (
    <>
      <section className="contact-section">
        <div className="container contact-inner">
          <h1 className="section-title">Contact Us</h1>
          <p className="contact-intro">Get in touch for collaborations, releases, or inquiries.</p>
          <div className="contact-methods">
            <a href="mailto:rasilarecording@gmail.com." className="contact-card">
              <span className="contact-label">Email</span>
              <span className="contact-value">rasilarecording@gmail.com.</span>
            </a>
            <a href="tel:+919826579100" className="contact-card">
              <span className="contact-label">Phone</span>
              <span className="contact-value">+91-9826579100</span>
            </a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="contact-card">
              <span className="contact-label">Address</span>
              <span className="contact-value">{ADDRESS}</span>
            </a>
          </div>
          <div className="contact-connect">
            <p className="contact-connect-heading">Click to connect with us on:</p>
            <div className="contact-connect-grid">
              {CONNECT_LINKS.map(({ name, url, icon, iconColor }) => (
                <a
                  key={name}
                  href={url}
                  target={url.startsWith('tel:') ? undefined : '_blank'}
                  rel={url.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                  className="contact-connect-link"
                  aria-label={name}
                  title={name}
                >
                  {icon === 'call' ? (
                    <CallIcon color={iconColor} />
                  ) : (
                    <img src={icon} alt="" className="contact-connect-icon" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
