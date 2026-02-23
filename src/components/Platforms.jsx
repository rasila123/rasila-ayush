import { useReveal } from '../hooks/useReveal'
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

const linkMap = {
  'iTunes': '#',
  'Rdio': '#',
  'Shazam': '#',
  'Apple Music': '#',
  'Spotify': 'https://open.spotify.com/album/5DRKGThUOKh8qU5z3gpcYk',
  'Amazon Music': 'https://music.amazon.com/albums/B0F34M5P16',
  'Audible': '#',
  'Snapchat': '#',
  'Canva': '#',
  'Pandora': '#',
  'YouTube': 'https://www.youtube.com/@rasilaInfotainmentrecording',
  'YouTube Shorts': 'https://youtube.com/shorts/7t8JmP553dQ?si=NyAnOxqpmtN2d2uY',
  'gaana': 'https://gaana.com/album/betiya-ghar-ka-satkar-hai',
  'SoundCloud': '#',
  'Saavn': 'https://www.jiosaavn.com/album/betiya-ghar-ka-satkar-hai/R4GkRjCN2ck_',
  'Hungama Music': '#',
  'Resso': '#',
  'Wynk Music': '#',
  'Anghami Music': '#',
  'Audible Magic': '#',
  'Facebook': 'https://www.facebook.com/share/1BD2nxbD2k/',
  'Instagram': 'https://www.instagram.com/rasilainfotainment?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  'WhatsApp': 'https://wa.me/9826579100',
  'YouTube Music': '#',
  'WeSing': '#',
  'TikTok': '#',
}

export default function Platforms() {
  const [ref, visible] = useReveal()
  
  const platforms = Object.keys(logoMap).map(name => ({
    name,
    logoUrl: logoMap[name],
    url: linkMap[name] || '#'
  }))

  return (
    <section className="presence-section" ref={ref}>
      <h2 className="section-heading">Our <span>Presence</span></h2>
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
            {/* <span className="platform-name">{name}</span> */}
          </a>
        ))}
      </div>
    </section>
  )
}
