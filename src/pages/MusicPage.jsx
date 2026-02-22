import Music from '../components/Music'
import Footer from '../components/Footer'

export default function MusicPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="section-title">Music</h1>
          <p className="section-intro">All published music in one place.</p>
        </div>
      </section>
      <Music />
      <Footer />
    </>
  )
}
