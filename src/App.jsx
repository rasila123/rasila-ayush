import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ArtistPage from './pages/ArtistPage'
import ArtistsPage from './pages/ArtistsPage'
import MusicPage from './pages/MusicPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="artist/:id" element={<ArtistPage />} />
        <Route path="artists" element={<ArtistsPage />} />
        <Route path="music" element={<MusicPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}
