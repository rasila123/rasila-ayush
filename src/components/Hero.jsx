import { Link } from 'react-router-dom'
import './Hero.css'

const STATS = [
  { count: '20 + Years', text: 'Experience', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuvH0WVv7w6V-d_iDSXBQCmz9CGM0XWPotHQ&s', alt: 'Experience' },
  { count: '1K +', text: 'Satisfied Artists', img: 'https://cdn-icons-png.flaticon.com/512/9104/9104636.png', alt: 'Artists' },
  { count: '30K +', text: 'Audios', img: 'https://cdn-icons-png.flaticon.com/512/4472/4472584.png', alt: 'Audios' },
  { count: '15K +', text: 'Videos', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISmhLTbb8GC8NgGhQMpz3J-0OBbBqwdgUsA&s', alt: 'Videos' },
  { count: '2M +', text: 'Subscribers', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9v03DGCRcA3m53cTgCgk3I-DHv2WzRz-8uA&s', alt: 'Subscribers' },
  { count: '7B +', text: 'Views', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEbHSnYazsz4iNmEq6tD_aBVdzq-fgNPmObw&s', alt: 'Views' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-block hero-visible">
          <img src="/logo.png" alt="" className="hero-logo" aria-hidden />
          <h1 className="hero-title">Rasila Infotainment</h1>
          <p className="hero-tagline">Music • Artists • Labels</p>
          <Link to="/contact" className="hero-cta">
            Contact
          </Link>
        </div>
        <div className="hero-stats stats-common">
          {STATS.map(({ count, text, img, alt }, i) => (
            <div key={text} className={`common-box hero-stat-visible reveal-delay-${Math.min(i + 1, 6)}`}>
              <i>
                <img src={img} alt={alt} />
              </i>
              <span className="count-data">{count}</span>
              <div className="counter-text">{text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
