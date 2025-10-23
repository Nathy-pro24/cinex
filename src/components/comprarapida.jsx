import React, { useState } from 'react';
import './comprarapida.css'; // Estilos separados para orden

const CompraRapida = () => {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [pelicula, setPelicula] = useState('');
  const [fecha, setFecha] = useState('');

  const peliculasDisponibles = [
    'Avengers: Endgame',
    'Spider-Man: No Way Home',
    'The Batman',
    'Dune',
    'Frozen II',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Película:', pelicula);
    console.log('Fecha:', fecha);
    // Aquí puedes agregar lógica para redirigir o enviar a backend
    setSidebarAbierto(false); // Cierra el sidebar después de agendar
  };

  return (
    <>
      {/* Botón flotante */}
      <a href="#" className="boton-flotante" onClick={(e) => {
        e.preventDefault();
        setSidebarAbierto(true);
      }}>
        ⚡ Compra Rápida
      </a>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarAbierto ? 'open' : ''}`}>
        <span className="cerrar" onClick={() => setSidebarAbierto(false)}>&times;</span>
        <h2>Agenda tu Película</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="pelicula">Película:</label><br />
          <input
            list="peliculas"
            id="pelicula"
            value={pelicula}
            onChange={(e) => setPelicula(e.target.value)}
            placeholder="Escribe el nombre..."
            required
          />
          <datalist id="peliculas">
            {peliculasDisponibles.map((peli, idx) => (
              <option value={peli} key={idx} />
            ))}
          </datalist>

          <br /><br />

          <label htmlFor="fecha">Fecha:</label><br />
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          /><br /><br />

          <button type="submit">Agendar</button>
        </form>
      </div>
    </>
  );
};

export default CompraRapida;