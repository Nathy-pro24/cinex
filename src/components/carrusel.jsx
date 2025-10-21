
import { useState, useEffect } from "react";

const images = [
  "1759539285021-large-Banner-web_11zon.webp",
  "1756158226331-large-2304-X-800-cabeza-pitufos.webp",
  "1760636789491-large-1-Banner-web-(1).webp",
  "1760982215402-large-Banner web.webp",
  "1760629817940-large-1-Banner-web-(1).webp",
  "1760628423132-large-BANNER WEB FANTA_11zon (1).webp",
  "1756918589897-large-CARRO web.webp",
];

function Carrusel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[900px] mx-auto relative">
      <div className="overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Botones */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-75 transition"
        aria-label="Anterior Slide"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-75 transition"
        aria-label="Siguiente Slide"
      >
        Next
      </button>

      {/* Indicadores */}
      <div className="flex justify-center mt-4 space-x-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-4 h-4 rounded-full ${
              currentIndex === idx ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carrusel;

