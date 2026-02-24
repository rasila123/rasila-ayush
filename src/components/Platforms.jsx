import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { supabase } from '../lib/supabase'
import './Section.css'

const logoMap = {
  'iTunes': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIiKOracQ8AnYdnjgy-CQe3Qkot0e0CU5XwQ&s',
  'Shazam': 'https://img.icons8.com/color/96/shazam.png',
  'Apple Music': 'https://www.shutterstock.com/image-vector/apple-music-logos-popular-streaming-600nw-2326870177.jpg',
  'Spotify': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdhm0QX77yGJFrD_lk6iASPtpxc_is48Sc_g&s',
  'Amazon Music': 'https://wallpapers.com/images/hd/amazon-music-logo-owwdlwkbkbplmz91-2.jpg',
  'Audible': 'https://cdn.worldvectorlogo.com/logos/audible.svg',
  'Snapchat': 'https://i.pinimg.com/736x/65/25/ea/6525ea3430a2145e472ce030dd98bdcb.jpg',
  'Canva': 'https://img.icons8.com/color/96/canva.png',
  'Pandora': 'https://img.icons8.com/color/96/pandora-app.png',
  'YouTube': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI2E5Huc3ioxoXvRVn1phb8yWyk9jOjOWI8Q&s',
  'YouTube Shorts': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMXlieX-1UjEMJUoe21hpPXUx6jOrKsYfJiA&s',
  'gaana': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Gaana_%28music_streaming_service%29_logo.png/1200px-Gaana_%28music_streaming_service%29_logo.png',
  'SoundCloud': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx1Qi6WJbO3ub1j4_pWBeajrs1A4wYL1sEmA&s',
  'Saavn': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/JioSaavn_Logo.svg/1024px-JioSaavn_Logo.svg.png',
  'Anghami Music': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOW63bhTaI5XulvseNt7vUInE5fEyCHzasuw&s',
  'Facebook': 'https://img.icons8.com/color/96/facebook-new.png',
  'Instagram': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png',
  'WhatsApp': 'https://img.icons8.com/color/96/whatsapp--v1.png',
  'YouTube Music': 'https://upload.wikimedia.org/wikipedia/commons/1/1c/YouTube_Music_2024.svg',
  'WeSing': 'https://play-lh.googleusercontent.com/R8ROhhJoi-A34JeO_nVb8-FSznLvCLnMvrN-gCWH_9HilcXyhC1KKF__yCsY6hjfThox=s96-rw',
  'TikTok': 'https://img.icons8.com/color/96/tiktok--v1.png',
  'Hungama Music': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStY-aRGGKFmYDq69A8kitKLeH1b7Ga6fBA6Q&s',
  'Resso': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpx4wBqh5oFPnIHc7gYBZMmuostvCCO1TWsw&s',
  'Wynk Music': 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Wynk_music_logo.png',
  'Audible Magic': 'https://www.audiblemagic.com/wp-content/uploads/2019/08/AM-Logo.png',
  'Rdio': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAsKIPKN1PnFJOJn4ItiP9LZrFkc1qjt7DOw&s'
}

// Default fallback links - edit these with your actual links
const defaultLinks = {
  'Spotify': 'https://open.spotify.com',
  'YouTube': 'https://www.youtube.com',
  'Instagram': 'https://instagram.com',
  'Facebook': 'https://facebook.com',
  'Apple Music': 'https://music.apple.com',
  'Amazon Music': 'https://music.amazon.com',
  'SoundCloud': 'https://soundcloud.com',
  'gaana': 'https://gaana.com',
  'Saavn': 'https://www.jiosaavn.com',
  'WhatsApp': 'https://wa.me'
}

export default function Platforms() {
  const [ref, visible] = useReveal()
  const [platformLinks, setPlatformLinks] = useState({})
  const [dbStatus, setDbStatus] = useState('checking')

  useEffect(() => {
    let isMounted = true;
    
    const fetchPlatformLinks = async () => {
      console.log('Platforms: Starting fetch...')
      setDbStatus('checking')
      
      // Initialize with default links first
      const linksMap = {}
      Object.keys(logoMap).forEach(name => {
        linksMap[name] = defaultLinks[name] || '#'
      })
      
      if (!supabase) {
        console.log('Platforms: No supabase client, using defaults')
        if (isMounted) {
          setPlatformLinks(linksMap)
          setDbStatus('no-client')
        }
        return
      }
      
      try {
        console.log('Platforms: Attempting to fetch from database...')
        
        // First try to check if the table exists by selecting with a limit
        const { data: platformData, error } = await supabase
          .from('platforms')
          .select('name, link')
          .limit(10)
        
        console.log('Platforms: Response received:', { data: platformData, error })
        
        if (error) {
          console.error('Platforms: Database error:', error)
          // If table doesn't exist or other error, use defaults
          if (isMounted) {
            setPlatformLinks(linksMap)
            setDbStatus('error')
          }
          return
        }
        
        // If we got data, update the links
        if (platformData && platformData.length > 0) {
          console.log('Platforms: Got data from DB:', platformData)
          platformData.forEach(platform => {
            if (platform.name && platform.link) {
              linksMap[platform.name] = platform.link
            }
          })
          setDbStatus('success')
        } else {
          console.log('Platforms: No data in platforms table, using defaults')
          setDbStatus('empty')
        }
        
        if (isMounted) {
          setPlatformLinks(linksMap)
        }
      } catch (err) {
        console.error('Platforms: Exception:', err)
        if (isMounted) {
          setPlatformLinks(linksMap)
          setDbStatus('exception')
        }
      }
    }

    fetchPlatformLinks()
    
    return () => {
      isMounted = false
    }
  }, [])

  const platforms = Object.keys(logoMap).map(name => ({
    name,
    logoUrl: logoMap[name],
    url: platformLinks[name] || '#'
  }))

  console.log('Platforms: Rendering with links:', platformLinks)

  return (
    <section className="presence-section" ref={ref}>
      <h2 className="section-heading">Our <span>Presence</span></h2>
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{textAlign:'center', fontSize:'12px', color:'#666', marginBottom:'10px'}}>
          DB Status: {dbStatus}
        </div>
      )}
      <div className="platforms">
        {platforms.map(({ name, url, logoUrl }, i) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`platform-card ${visible ? 'visible' : ''}`}
            style={{ animationDelay: `${i * 0.05}s` }}
            aria-label={name}
          >
            <img src={logoUrl} alt={name} className="platform-logo" />
          </a>
        ))}
      </div>
    </section>
  )
}
