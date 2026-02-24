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
  const [error, setError] = useState(null)
  const [ref, visible] = useReveal()

  useEffect(() => {
    let isMounted = true;
    
    const fetchArtists = async () => {
      console.log('Artists: Starting fetch...')
      setLoading(true)
      setError(null)
      
      if (!supabase) {
        console.error('Artists: Supabase not initialized')
        setError('Supabase not initialized')
        setLoading(false)
        return
      }
      
      try {
        const { data, error: fetchError } = await supabase
          .from('artists')
          .select('*')
          .order('created_at', { ascending: false })
        
        console.log('Artists: Response:', { data, error: fetchError })
        
        if (fetchError) {
          console.error('Artists: Error fetching artists:', fetchError)
          setError(fetchError.message)
        } else {
          if (isMounted) {
            setArtists(data || [])
            console.log('Artists: Artists loaded:', data?.length || 0)
          }
        }
      } catch (err) {
        console.error('Artists: Exception:', err)
        setError(err.message)
      }
      
      if (isMounted) {
        setLoading(false)
      }
    }

    fetchArtists()
    
    return () => {
      isMounted = false
    }
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
        {error && <div style={{textAlign:'center', padding:'20px', color:'red'}}>Error: {error}</div>}
      </section>
    )
  }

  // Grid layout for separate artists page
  return (
    <section className="section" id="artists" ref={ref}>
      <div className="container">
        <h2 className={`section-title reveal ${visible ? 'reveal-visible' : ''}`}>Our Artists</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div style={{textAlign:'center', padding:'20px', color:'red'}}>Error: {error}</div>
        ) : artists.length === 0 ? (
          <div style={{textAlign:'center', padding:'20px'}}>No artists found. Add artists via Admin panel.</div>
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
