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
          <Link to="/music">Music</Link>
          <Link to="/artists">Artists</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-contact-info">
          <p><a href="mailto:rasilarecording@gmail.com.">Email: rasilarecording@gmail.com</a></p>
          <p><a href="tel:+919826579100">Phone: +91-9826579100</a></p>
        </div>
        <div className="footer-legal">
          <p>Official site of Rasila Infotainment</p>
          <p>Developed with ❤️ by <Link to="/admin" className="footer-developer-link">Ayush Raj Sharma</Link></p>
          <p>© {new Date().getFullYear()} Rasila Infotainment</p>
        </div>
      </div>
    </footer>
  )
}
