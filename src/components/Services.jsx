import { useReveal } from '../hooks/useReveal'
import './Section.css'

const DEFAULT_SERVICES = [
  { id: '1', title: 'Music Production', description: 'Professional recording, mixing and mastering for artists and labels.', image: '/placeholders/service.svg' },
  { id: '2', title: 'Artist Management', description: 'End-to-end support for artists from strategy to releases.', image: '/placeholders/service.svg' },
  { id: '3', title: 'Label Services', description: 'Distribution, promotion and rights management for labels.', image: '/placeholders/service.svg' },
]

export default function Services({ services = DEFAULT_SERVICES }) {
  const [ref, visible] = useReveal()
  return (
    <section className="section" id="services" ref={ref}>
      <div className="container">
        <h2 className={`section-title reveal ${visible ? 'reveal-visible' : ''}`}>Our Services</h2>
        <div className="section-grid section-grid-uniform">
          {services.map(({ id, title, description, image }, i) => (
            <article
              key={id}
              className={`section-card section-card-service reveal ${visible ? 'reveal-visible' : ''} reveal-delay-${Math.min(i + 1, 6)}`}
            >
              <div className="section-card-img-wrap">
                <img src={image} alt={title} className="section-card-img" />
              </div>
              <h3 className="section-card-title">{title}</h3>
              <p className="section-card-desc">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
