import { useReveal } from '../hooks/useReveal'
import './Section.css'

const PLATFORMS = [
  { name: 'Spotify', url: 'https://spotify.com', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spotify.svg' },
  { name: 'Instagram', url: 'https://instagram.com', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg' },
  { name: 'Facebook', url: 'https://facebook.com', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg' },
  { name: 'YouTube', url: 'https://youtube.com', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg' },
  { name: 'Apple Music', url: 'https://music.apple.com', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/applemusic.svg' },
  { name: 'SoundCloud', url: 'https://soundcloud.com', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/soundcloud.svg' },
]

export default function Platforms({ platforms = PLATFORMS }) {
  const [ref, visible] = useReveal()
  return (
    <section className="section section-alt" id="platforms" ref={ref}>
      <div className="container">
        <h2 className={`section-title reveal ${visible ? 'reveal-visible' : ''}`}>Find Us On</h2>
        <div className={`platforms-grid reveal ${visible ? 'reveal-visible' : ''} reveal-delay-1`}>
          {platforms.map(({ name, url, logoUrl }, i) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`platform-card reveal ${visible ? 'reveal-visible' : ''} reveal-delay-${Math.min(i + 2, 6)}`}
              aria-label={name}
            >
              <img src={logoUrl} alt="" className="platform-logo" />
              <span className="platform-name">{name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
