import React, { useState } from 'react';

const Hermanastra = () => {
  const [activeDay, setActiveDay] = useState('hoy');
  const [selectedFormato, setSelectedFormato] = useState('2D');
  const [selectedIdioma, setSelectedIdioma] = useState('Español');

  return (
    <div className="bg-black text-white min-h-screen px-6 py-12 font-sans">
      <div className="max-w-6xl mx-auto bg-stone-900 rounded-lg shadow-lg overflow-hidden">

        <div className="flex flex-col md:flex-row">

          {/* Portada + Sinopsis a la izquierda */}
          <div className="md:w-1/3 bg-stone-800 flex flex-col items-center p-4 space-y-6">
            <img
              src="./hermanastra.jpg" // Cambia el nombre según tu imagen en /public
              alt="La Hermanastra Fea - Portada"
              className="w-full max-h-[400px] object-contain rounded-lg shadow-2xl"
            />
            {/* Sinopsis */}
            <div>
              <h2 className="text-xl font-semibold text-red-500 mb-2 text-center md:text-left">🧟 Sinopsis</h2>
              <p className="text-gray-300 leading-relaxed text-center md:text-left">
                Combinando comedia y terror, la película es una versión atrevida e inesperada del famoso cuento, vista a través de los ojos de Elvira, la hermanastra de Cenicienta. La sangrienta película sigue a Elvira en su lucha por competir con su increíblemente bella hermanastra en un reino donde la belleza es un negocio brutal. Elvira hará todo lo posible por atraer la atención del príncipe.
              </p>
            </div>
          </div>

          {/* Contenido a la derecha */}
          <div className="md:w-2/3 p-8 space-y-10">

            {/* Título */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-red-600 mb-2">🎬 La Hermanastra Fea</h1>
              <p className="text-gray-400 text-sm italic">Comedia · Drama</p>
            </div>

            {/* Información básica */}
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-300">
              <p><span className="font-semibold text-white">Duración:</span> 1h 45m</p>
              <p><span className="font-semibold text-white">Clasificación:</span> PG-13</p>
              <p><span className="font-semibold text-white">Formato:</span> 2D</p>
            </div>

            {/* Detalles de la función */}
            <div>
              <h2 className="text-xl font-semibold text-red-500 mb-2">🎟️ Detalles de la Función</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li><span className="font-semibold text-white">Idioma:</span> Español</li>
                <li><span className="font-semibold text-white">Fecha de estreno:</span> 15 Octubre, 2025</li>
                <li><span className="font-semibold text-white">Distribuidor:</span> CINEX </li>
              </ul>
            </div>

            {/* Horarios estilo pestañas y dropdowns */}
            <div>
              <h2 className="text-2xl font-bold mb-4 uppercase">HORARIOS</h2>

              {/* Pestañas */}
              <div className="inline-flex rounded-lg overflow-hidden border border-white mb-4 text-sm font-bold uppercase">
                <button
                  onClick={() => setActiveDay('hoy')}
                  className={`px-8 py-3 focus:outline-none transition-colors duration-200 ${
                    activeDay === 'hoy'
                      ? 'bg-white text-black'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  HOY
                </button>
                <button
                  onClick={() => setActiveDay('mie')}
                  className={`px-8 py-3 border-l border-white focus:outline-none transition-colors duration-200 ${
                    activeDay === 'mie'
                      ? 'bg-white text-black'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  MIÉ <br /> 22/OCT
                </button>
              </div>

              {/* Dropdowns */}
              <div className="flex gap-4 mb-6">
                <select
                  value={selectedFormato}
                  onChange={(e) => setSelectedFormato(e.target.value)}
                  className="bg-black border border-white text-white rounded-md px-4 py-2 cursor-pointer focus:outline-none"
                >
                  <option value="2D">2D</option>
                  <option value="3D">3D</option>
                  <option value="IMAX">IMAX</option>
                </select>

                <select
                  value={selectedIdioma}
                  onChange={(e) => setSelectedIdioma(e.target.value)}
                  className="bg-black border border-white text-white rounded-md px-4 py-2 cursor-pointer focus:outline-none"
                >
                  <option value="Español">Español</option>
                  <option value="Inglés">Inglés</option>
                  <option value="Subtitulada">Subtitulada</option>
                </select>
              </div>

              {/* Horarios según selección */}
              <div className="bg-stone-800 rounded-md p-4 text-gray-300 font-semibold flex justify-center">
                <div className="flex gap-16 w-72 mx-auto">
                  {activeDay === 'hoy' && (
                    <>
                      <div className="w-24 text-center" key="hoy-1">18:30 hs</div>
                      <div className="w-24 text-center" key="hoy-2">21:00 hs</div>
                      <div className="w-24 text-center" key="hoy-3">—</div>
                    </>
                  )}
                  {activeDay === 'mie' && (
                    <>
                      <div className="w-24 text-center" key="mie-1">18:30 hs</div>
                      <div className="w-24 text-center" key="mie-2">21:00 hs</div>
                      <div className="w-24 text-center" key="mie-3">—</div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Cine */}
            <div>
              <h2 className="text-xl font-semibold text-red-500 mb-2">📍 Cine</h2>
              <p className="text-gray-300">
                <span className="font-semibold text-white">Cinemark Mallplaza Comas</span><br />
                Dirección: MallPlaza, Las Almendras 126, Comas
              </p>
            </div>

            {/* Disponibilidad de asientos */}
            <div>
              <h2 className="text-xl font-semibold text-red-500 mb-2">📶 Disponibilidad de Asientos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['Alta', 'Media', 'Baja', 'Lleno'].map((estado, index) => (
                  <div
                    key={index}
                    className={`py-2 text-center rounded-lg font-bold text-sm 
                      ${
                        estado === 'Alta'
                          ? 'bg-green-600'
                          : estado === 'Media'
                          ? 'bg-yellow-500'
                          : estado === 'Baja'
                          ? 'bg-orange-500'
                          : 'bg-red-600'
                      }`}
                  >
                    {estado}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Hermanastra;


