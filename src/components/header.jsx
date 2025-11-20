import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; 
import './header.css';

function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsub();
    }, []);

    return (
        <header>
            <div className="container">
                <nav>
                    <ul>

                        {/* FOTO DE USUARIO + ESTADO */}
                        {user && (
                            <div className="user-info">
                                <Link to="/usuario" className="user-link">
                                    <img 
                                        src={user.photoURL || "/usuario.jpg"}
                                        alt="Foto de perfil" 
                                        className="profile-img"
                                    />
                                </Link>
                                <span className="status-dot"></span>
                            </div>
                        )}

                        <Link className='logo' to="/cinex">CINEX</Link>
                        <Link to="/peliculas">Cartelera</Link>
                        <Link to="/alimentosybebidas">Alimentos y Bebidas</Link>
                        <Link to="/peliculas">
                            <i className="fa-solid fa-magnifying-glass fa-beat-fade"></i>
                        </Link>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;
