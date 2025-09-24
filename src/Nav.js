import './Nav.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Nav({ token }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="nav-container">
        

        {/* Hamburger visibile solo su mobile */}
        <button className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Menu */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          
          <li><Link to="/specials">Menu</Link></li>
          <li>
            {token 
              ? <Link to="/reservation">Reservations</Link> 
              : <Link to="/login">Reservations</Link>
            }
          </li>
          
          <li>
            {
              
              <Link to="/login">Login / Register</Link>
            }
          </li>
        </ul>
      </div>
    </nav>
  );
}
