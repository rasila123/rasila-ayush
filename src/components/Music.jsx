import { useReveal } from '../hooks/useReveal'
import './Section.css'

const DEFAULT_TRACKS = [
  { id: '1', name: 'Track One', thumbnail: '/placeholders/music.svg', url: '#' },
  { id: '2', name: 'Track Two', thumbnail: '/placeholders/music.svg', url: '#' },
  { id: '3', name: 'Track Three', thumbnail: '/placeholders/music.svg', url: '#' },
  { id: '4', name: 'Track Four', thumbnail: '/placeholders/music.svg', url: '#' },
]

export default function Music({ tracks = DEFAULT_TRACKS }) {
  const [ref, visible] = useReveal()
  return (
    <section className="section section-alt" id="music" ref={ref}>
      <div className="container">
        <h2 className={`section-title reveal ${visible ? 'reveal-visible' : ''}`}>Music</h2>
        <div className="section-grid section-grid-uniform">
          {tracks.map(({ id, name, thumbnail, url }, i) => (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`section-card section-card-link reveal ${visible ? 'reveal-visible' : ''} reveal-delay-${Math.min(i + 1, 6)}`}
            >
              <div className="section-card-img-wrap">
                <img src={thumbnail} alt={name} className="section-card-img" />
              </div>
              <span className="section-card-title">{name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
