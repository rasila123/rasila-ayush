import { useReveal } from '../hooks/useReveal'
import './Section.css'

const DEFAULT_LABELS = [
  { id: '1', name: 'Rasila Records', image: '/placeholders/label.svg', channelUrl: '#' },
  { id: '2', name: 'Rasila Music', image: '/placeholders/label.svg', channelUrl: '#' },
]

export default function Labels({ labels = DEFAULT_LABELS }) {
  const [ref, visible] = useReveal()
  return (
    <section className="section" id="labels" ref={ref}>
      <div className="container">
        <h2 className={`section-title reveal ${visible ? 'reveal-visible' : ''}`}>Our Labels</h2>
        <div className={`section-grid section-grid-uniform reveal ${visible ? 'reveal-visible' : ''} reveal-delay-1`}>
          {labels.map(({ id, name, image, channelUrl }, i) => (
            <a
              key={id}
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`section-card section-card-link reveal ${visible ? 'reveal-visible' : ''} reveal-delay-${Math.min(i + 2, 6)}`}
            >
              <div className="section-card-img-wrap">
                <img src={image} alt={name} className="section-card-img" />
              </div>
              <span className="section-card-title">{name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
