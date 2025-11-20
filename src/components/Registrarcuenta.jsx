import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // <-- IMPORTANTE
import "./Registrarcuenta.css";

function Registrarcuenta() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // <-- Para redirección

  //Función para crear un usuario
  const registrar = () => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("✅ Usuario creado exitosamente");
        navigate("/contacto"); // Redirección
      })
      .catch((error) => {
        console.log("Error al crear la cuenta", error);
        alert("❌ Error al crear tu cuenta: " + error.message);
      });
  };

  return (
    <div className="registro-container">
      <h2>Registrar tu cuenta</h2>

      <form className="registro-form">
        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            required
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            required
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="button" onClick={registrar}>
          Registrar cuenta
        </button>
      </form>
    </div>
  );
}

export default Registrarcuenta;
