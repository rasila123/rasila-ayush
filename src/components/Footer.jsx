import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/logo.png" alt="Rasila" className="footer-logo" />
          <span className="footer-name">Rasila</span>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/#music">Music</Link>
          <Link to="/#artists">Artists</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-legal">
          <p>&copy; {new Date().getFullYear()} Rasila. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
