import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import '../components/Section.css'
import './ArtistPage.css'

export default function ArtistPage() {
  const { id } = useParams()
  const [artist, setArtist] = useState(null)
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) {
        console.error('Supabase not initialized')
        setLoading(false)
        return
      }

      // Fetch artist by id
      const { data: artistData, error: artistError } = await supabase
        .from('artists')
        .select('*')
        .eq('id', id)
        .single()

      if (artistError) {
        console.error('Error fetching artist:', artistError)
      } else {
        setArtist(artistData)
        
        // Fetch songs by artist name
        const { data: songsData, error: songsError } = await supabase
          .from('songs')
          .select('*')
          .eq('artist', artistData.name)
          .order('created_at', { ascending: false })
        
        if (songsError) {
          console.error('Error fetching songs:', songsError)
        } else {
          setSongs(songsData || [])
        }
      }
      setLoading(false)
    }

    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="container page-wrap">
        <p>Loading...</p>
      </div>
    )
  }

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
            <img src={artist.photo} alt={artist.name} className="section-card-img" />
          </div>
          <h1 className="artist-name">{artist.name}</h1>
        </section>
        <section className="artist-works">
          <h2>Works</h2>
          {songs.length === 0 ? (
            <p>No songs found for this artist.</p>
          ) : (
            <div className="section-grid section-grid-uniform">
              {songs.map(({ id: songId, title, thumbnail, url }) => (
                <a
                  key={songId}
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
          )}
        </section>
      </div>
    </div>
  )
}
