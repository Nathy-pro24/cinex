import { Link } from 'react-router-dom';
import datos from '../data/peliculas.json';
import "./peliculas.css";

function ListaPeliculas() {
  return (
    <div id='cartelera' className="bg-black min-h-screen px-10 py-20">
      <h1 className="text-center text-5xl font-bold text-red-600 mb-14 uppercase tracking-widest title-font">
        🎬 Cartelera de Películas
      </h1>

      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {datos.peliculas.map((pelicula) => (
          <div
            key={pelicula.id}
            className="bg-stone-900 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={`./${pelicula.imagen}`}
              alt={pelicula.titulo}
              className="w-full h-[300px] object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold text-white mb-2">{pelicula.titulo}</h3>
            <p className="text-sm text-gray-400 mb-1">🎞️ {pelicula.genero}</p>
            <p className="text-sm text-gray-400 mb-1">🗓️ {pelicula.año}</p>
            <p className="text-sm text-gray-400 mb-1">⏱️ {pelicula.duracion}</p>
            <p className="text-sm text-gray-300 mt-2">{pelicula.descripcion}</p>

            <Link to={`${pelicula.url}`} className="mt-4 bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-full text-sm tracking-wide uppercase">
              Estreno
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaPeliculas;
