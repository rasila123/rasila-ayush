import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { supabase } from '../lib/supabase'
import Carousel from './Carousel'
import './Carousel.css'
import './Section.css'

export default function Music({ useCarousel = true }) {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ref, visible] = useReveal()

  useEffect(() => {
    let isMounted = true;
    
    const fetchTracks = async () => {
      console.log('Music: Starting fetch...')
      setLoading(true)
      setError(null)
      
      if (!supabase) {
        console.error('Music: Supabase not initialized')
        setError('Supabase not initialized')
        setLoading(false)
        return
      }
      
      try {
        const { data, error: fetchError } = await supabase
          .from('songs')
          .select('*')
          .order('created_at', { ascending: false })
        
        console.log('Music: Response:', { data, error: fetchError })
        
        if (fetchError) {
          console.error('Music: Error fetching tracks:', fetchError)
          setError(fetchError.message)
        } else {
          if (isMounted) {
            setTracks(data || [])
            console.log('Music: Tracks loaded:', data?.length || 0)
          }
        }
      } catch (err) {
        console.error('Music: Exception:', err)
        setError(err.message)
      }
      
      if (isMounted) {
        setLoading(false)
      }
    }

    fetchTracks()
    
    return () => {
      isMounted = false
    }
  }, [])

  const renderTrack = (track) => (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="carousel-card carousel-card-link"
    >
      <div className="carousel-card-img-wrap">
        <img src={track.thumbnail} alt={track.title} className="carousel-card-img" />
      </div>
      <div className="carousel-card-content">
        <h3 className="carousel-card-title">{track.title}</h3>
      </div>
    </a>
  )

  // Carousel layout for homepage
  if (useCarousel) {
    return (
      <section className="section section-alt" id="music" ref={ref}>
        <Carousel
          title="Music"
          items={tracks}
          renderItem={renderTrack}
          loading={loading}
        />
        {error && <div style={{textAlign:'center', padding:'20px', color:'red'}}>Error: {error}</div>}
      </section>
    )
  }

  // Grid layout for separate music page
  return (
    <section className="section" id="music" ref={ref}>
      <div className="container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div style={{textAlign:'center', padding:'20px', color:'red'}}>Error: {error}</div>
        ) : tracks.length === 0 ? (
          <div style={{textAlign:'center', padding:'20px'}}>No songs found. Add songs via Admin panel.</div>
        ) : (
          <div className="section-grid section-grid-uniform">
            {tracks.map(({ id, title, thumbnail, url }, i) => (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                key={id}
                className={`section-card section-card-service reveal ${visible ? 'reveal-visible' : ''} reveal-delay-${Math.min(i + 1, 6)}`}
              >
                <div className="section-card-img-wrap">
                  <img src={thumbnail} alt={title} className="section-card-img" />
                </div>
                <h3 className="section-card-title">{title}</h3>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
