import { Link } from 'react-router-dom';

import './header.css'

function Header() {
    return (
        <header>
            <div className="container">
                <nav>
                    <ul>
                        <Link className='logo' to="/cinex">CINEX</Link>
                        <Link to="/peliculas">Cartelera</Link>
                        
                        <Link to="/alimentosybebidas">Alimentos y Bebidas</Link>
                        <Link to="/peliculas"><i className="fa-solid fa-magnifying-glass fa-beat-fade"></i></Link>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;