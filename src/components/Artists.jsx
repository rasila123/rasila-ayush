import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { supabase } from '../lib/supabase'
import Carousel from './Carousel'
import './Carousel.css'
import './Section.css'

export default function Artists({ useCarousel = true }) {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [ref, visible] = useReveal()

  useEffect(() => {
    const fetchArtists = async () => {
      if (!supabase) {
        console.error('Supabase not initialized')
        setLoading(false)
        return
      }
      
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching artists:', error)
      } else {
        setArtists(data || [])
      }
      setLoading(false)
    }

    fetchArtists()
  }, [])

  const renderArtistCarousel = (artist) => (
    <Link to={`/artist/${artist.id}`} className="carousel-card carousel-card-link">
      <div className="carousel-card-img-wrap">
        <img src={artist.photo} alt={artist.name} className="carousel-card-img" />
      </div>
      <div className="carousel-card-content">
        <h3 className="carousel-card-title">{artist.name}</h3>
      </div>
    </Link>
  )

  // Carousel layout for homepage
  if (useCarousel) {
    return (
      <section className="section section-alt" id="artists" ref={ref}>
        <Carousel
          title="Artists"
          items={artists}
          renderItem={renderArtistCarousel}
          loading={loading}
        />
      </section>
    )
  }

  // Grid layout for separate artists page
  return (
    <section className="section" id="artists" ref={ref}>
      <div className="container">
        <h2 className={`section-title reveal ${visible ? 'reveal-visible' : ''}`}>Artists</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="section-grid section-grid-uniform">
            {artists.map(({ id, name, photo }, i) => (
              <Link
                to={`/artist/${id}`}
                key={id}
                className={`section-card section-card-service reveal ${visible ? 'reveal-visible' : ''} reveal-delay-${Math.min(i + 1, 6)}`}
              >
                <div className="section-card-img-wrap">
                  <img src={photo} alt={name} className="section-card-img" />
                </div>
                <h3 className="section-card-title">{name}</h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
