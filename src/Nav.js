
import './Nav.css'; // aggiungiamo un file di stile

export default function Nav() {
  return (
    <div className="navbar">
      
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Chi siamo</a></li>
          <li><a href="#">Contatti</a></li>
        </ul>
      </nav>
    </div>
  );
}
