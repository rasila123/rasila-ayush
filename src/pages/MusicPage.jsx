import Music from '../components/Music'
import Footer from '../components/Footer'

export default function MusicPage() {
  return (
    <>
      <section className="section" style={{ paddingBottom: '1rem' }}>
        <div className="container">
          <h1 className="section-title">Music</h1>
        </div>
      </section>
      <Music useCarousel={false} />
      <Footer />
    </>
  )
}
