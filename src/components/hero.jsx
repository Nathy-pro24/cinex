import { Link } from 'react-router-dom';
import './hero.css';

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-overlay">
        <div className="hero-content">
          <h2>Bienvenido a CineX</h2>
          <p>Explora, disfruta y vive la emoción del cine desde donde estés.</p>
          <Link to="/contacto" className="hero-button">Registrate aquì</Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
