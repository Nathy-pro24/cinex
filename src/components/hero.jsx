import { Link } from 'react-router-dom';
import './hero.css'
function Hero() {
  return (
    <section 
      className="
        relative w-full h-screen 
        bg-gradient-to-br from-black via-gray-900 to-red-900 
        flex items-center justify-center
        overflow-hidden
      "
      id="inicio"
    >

      {/* Fondo estilo cine */}
      <div
        className="
          absolute inset-0 
          bg-[url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1600&q=80')]
          bg-cover bg-center opacity-40 
          animate-pulse
        "
      ></div>

      {/* Capa oscura + blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Contenido */}
      <div className="relative text-center px-6 max-w-3xl">
        <h2 className="form-title_hero font-extrabold text-white drop-shadow-xl tracking-wide">
          Bienvenido a <span className="text-red-500">CineX</span>
        </h2>

        <p className="text-lg md:text-xl text-gray-200 mt-4 font-light">
          Explora, disfruta y vive la emoción del cine desde donde estés.
        </p>

        <Link
          to="/contacto"
          className="
            inline-block mt-8 px-8 py-3 
            text-lg font-semibold 
            bg-red-600 hover:bg-red-700 
            text-white rounded-lg
            shadow-lg hover:shadow-red-600/50 
            transition-all duration-300
          "
        >
          Regístrate aquí
        </Link>
      </div>



    </section>
  );
}

export default Hero;
