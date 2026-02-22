import { useParams, Link } from 'react-router-dom'
import '../components/Section.css'
import './ArtistPage.css'

// Demo data – replace with Supabase fetch using artist id
const MOCK_ARTISTS = {
  '1': { name: 'Artist One', image: '/placeholders/artist.svg', bio: 'Bio for Artist One.' },
  '2': { name: 'Artist Two', image: '/placeholders/artist.svg', bio: 'Bio for Artist Two.' },
  '3': { name: 'Artist Three', image: '/placeholders/artist.svg', bio: 'Bio for Artist Three.' },
}

const MOCK_WORKS = [
  { id: '1', title: 'Track A', thumbnail: '/placeholders/music.svg', url: '#' },
  { id: '2', title: 'Track B', thumbnail: '/placeholders/music.svg', url: '#' },
  { id: '3', title: 'Track C', thumbnail: '/placeholders/music.svg', url: '#' },
]

export default function ArtistPage() {
  const { id } = useParams()
  const artist = MOCK_ARTISTS[id]

  if (!artist) {
    return (
      <div className="container page-wrap">
        <p>Artist not found.</p>
        <Link to="/">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="artist-page">
      <div className="container">
        <Link to="/#artists" className="artist-back">← Back to Artists</Link>
        <section className="artist-hero">
          <div className="artist-hero-img-wrap">
            <img src={artist.image} alt={artist.name} className="section-card-img" />
          </div>
          <h1 className="artist-name">{artist.name}</h1>
          {artist.bio && <p className="artist-bio">{artist.bio}</p>}
        </section>
        <section className="artist-works">
          <h2>Works</h2>
          <div className="section-grid section-grid-uniform">
            {MOCK_WORKS.map(({ id: workId, title, thumbnail, url }) => (
              <a
                key={workId}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="section-card section-card-link"
              >
                <div className="section-card-img-wrap">
                  <img src={thumbnail} alt={title} className="section-card-img" />
                </div>
                <span className="section-card-title">{title}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
