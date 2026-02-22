import Artists from '../components/Artists'
import Footer from '../components/Footer'

export default function ArtistsPage() {
  return (
    <>
      {/* <section className="section">
        <div className="container">
          <h1 className="section-title">Artists</h1>
          <p className="section-intro">All our talented artists in one place.</p>
        </div>
      </section> */}
      <Artists useCarousel={false} />
      <Footer />
    </>
  )
}
