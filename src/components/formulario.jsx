
import { Link } from "react-router-dom";
import "./formulario.css";

function Basta() {
  return (
    <div className="form-container">
      <h2 className="form-title">Regístrate aquí</h2>
      <form>
        <input type="text" placeholder="Tu nombre" className="form-input" />
        <input type="password" placeholder="Tu contraseña" className="form-input" />
        <Link to="/peliculas" className="form-button">Iniciar Sesión</Link>
      </form>
    </div>
  );
}

export default Basta;