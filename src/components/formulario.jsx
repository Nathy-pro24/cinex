import { Link } from "react-router-dom";
import "./formulario.css";

import React, { useState } from "react";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

function Basta() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const iniciarSesion = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Usuario inició sesión:", userCredential.user);
        navigate("/peliculas");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error.code, error.message);
      });
  };

  const registrarUsuario = () => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Usuario registrado:", userCredential.user);
      })
      .catch((error) => {
        console.error("Error al registrarse:", error.code, error.message);
      });
  };

  const iniciarConGoogle = () => {
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Inicio con Google exitoso:", result.user);
        navigate("/peliculas");
      })
      .catch((error) => {
        console.error("Error al iniciar con Google:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    iniciarSesion();
  };

  return (
    <div className="form-container">
      <h2 className="form-title">CINEX</h2>

      <form onSubmit={handleSubmit}>  
        
        <input 
          type="text" 
          placeholder="Correo electrónico o número de télefono" 
          className="form-input" 
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />

        <input 
          type="password" 
          placeholder="Contraseña" 
          className="form-input"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />

        <Link to="/peliculas" className="form-button">Iniciar Sesión</Link>

      


        {/*  TEXTO AGREGADO ABAJO */}
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          ¿No tienes una cuenta?{" "}
          <Link 
            to="/registro" 
            style={{ color: "#e81a1aff", fontWeight: "bold" }}
          >
            Regístrate
          </Link>
        </p>



        <button 
          type="button" 
          onClick={iniciarConGoogle} 
          className="form-button"
          style={{ marginTop: "10px", backgroundColor: "white", color: "black" }}
        >
          Iniciar con Google
        </button>

      </form>

     


    </div>


  );
}

export default Basta;
