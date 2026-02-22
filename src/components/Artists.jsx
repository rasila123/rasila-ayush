import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import './Section.css'

const DEFAULT_ARTISTS = [
  { id: '1', name: 'Artist One', image: '/placeholders/artist.svg' },
  { id: '2', name: 'Artist Two', image: '/placeholders/artist.svg' },
  { id: '3', name: 'Artist Three', image: '/placeholders/artist.svg' },
]

export default function Artists({ artists = DEFAULT_ARTISTS }) {
  const [ref, visible] = useReveal()
  return (
    <section className="section" id="artists" ref={ref}>
      <div className="container">
        <h2 className={`section-title reveal ${visible ? 'reveal-visible' : ''}`}>Artists</h2>
        <div className="section-grid section-grid-uniform">
          {artists.map(({ id, name, image }, i) => (
            <Link
              key={id}
              to={`/artist/${id}`}
              className={`section-card section-card-link reveal ${visible ? 'reveal-visible' : ''} reveal-delay-${Math.min(i + 1, 6)}`}
            >
              <div className="section-card-img-wrap">
                <img src={image} alt={name} className="section-card-img" />
              </div>
              <span className="section-card-title">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
