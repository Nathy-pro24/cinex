import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import './header.css';

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsub();
    }, []);

    const cerrarSesion = async () => {
        try {
            await signOut(auth);
            navigate("/"); // Redirige al inicio
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <header>
            <div className="container">
                <nav>
                    <ul>

                        {/* FOTO DE USUARIO + ESTADO + BOTÓN CERRAR SESIÓN */}
                        {user && (
                            <li className="user-info">
                                <Link to="/usuario" className="user-link">
                                    <img
                                        src={user.photoURL || "/usuario.jpg"}
                                        alt="Foto de perfil"
                                        className="profile-img"
                                        onError={(e) => (e.target.src = "/usuario.jpg")}
                                    />
                                </Link>
                                <span className="status-dot"></span>
                                <button className="logout-btn" onClick={cerrarSesion}>
                                    Cerrar sesión
                                </button>
                            </li>
                        )}

                        <li><Link className="logo" to="/cinex">CINEX</Link></li>
                        <li><Link to="/peliculas">Cartelera</Link></li>
                        <li><Link to="/alimentosybebidas">Alimentos y Bebidas</Link></li>
                        <li><Link to="/opiniones">Opiniones</Link></li>

                        <li>
                            <Link to="/peliculas">
                                <i className="fa-solid fa-magnifying-glass fa-beat-fade"></i>
                            </Link>
                        </li>

                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
