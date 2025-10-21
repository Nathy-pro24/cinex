import React, { useState } from 'react';

const It = () => {
  const [selectedDay, setSelectedDay] = useState('hoy');
  const [selectedFormato, setSelectedFormato] = useState('');
  const [selectedIdioma, setSelectedIdioma] = useState('');

  return (
    <div className="bg-black text-white min-h-screen px-6 py-12 font-sans">
      <div className="max-w-6xl mx-auto bg-stone-900 rounded-lg shadow-lg overflow-hidden">

        <div className="flex flex-col md:flex-row">

          {/* Imagen + Sinopsis a la izquierda */}
          <div className="md:w-1/3 bg-stone-800 flex flex-col items-center p-4 space-y-6">
            <img
              src="/it.jpg" // Coloca la imagen en /public/
              alt="IT 2017 - Portada"
              className="w-full max-h-[400px] object-contain rounded-lg shadow-2xl"
            />
            <div>
              <h2 className="text-xl font-semibold text-red-500 mb-2 text-center md:text-left">🧟 Sinopsis</h2>
              <p className="text-gray-300 leading-relaxed text-center md:text-left">
                En el verano de 1989, un grupo de niños decide unirse para destruir a un monstruo que cambia de forma 
                y se disfraza de payaso, atacando a los niños de Derry, un pequeño pueblo de Maine.
              </p>
            </div>
          </div>

          {/* Contenido a la derecha */}
          <div className="md:w-2/3 p-8 space-y-10">

            {/* Título */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-red-600 mb-2">🎬 IT [2017]</h1>
              <p className="text-gray-400 text-sm">Una película de terror inolvidable</p>
            </div>

            {/* Información básica */}
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-300">
              <p><span className="font-semibold text-white">Duración:</span> 2h 15m</p>
              <p><span className="font-semibold text-white">Clasificación:</span> M14</p>
              <p><span className="font-semibold text-white">Género:</span> Terror</p>
            </div>

            {/* Detalles de función */}
            <div>
              <h2 className="text-xl font-semibold text-red-500 mb-2">🎟️ Detalles de la Función</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li><span className="font-semibold text-white">Formato:</span> 2D</li>
                <li><span className="font-semibold text-white">Fecha de estreno:</span> 09 Octubre, 2025</li>
                <li><span className="font-semibold text-white">Distribuidor:</span> CINEX</li>
              </ul>
            </div>

            {/* Horarios con pestañas y dropdowns */}
            <div>
              <h2 className="text-xl font-semibold text-red-500 mb-4">🗓️ Horarios</h2>

              {/* Pestañas Día */}
              <div className="flex rounded-lg overflow-hidden mb-4 border border-gray-700 max-w-sm">
                <button
                  onClick={() => setSelectedDay('hoy')}
                  className={`flex-1 py-3 font-bold text-sm uppercase ${
                    selectedDay === 'hoy' ? 'bg-white text-black' : 'bg-gray-900 text-white'
                  }`}
                >
                  Hoy
                </button>
                <button
                  onClick={() => setSelectedDay('mie')}
                  className={`flex-1 py-3 font-bold text-xs uppercase text-center ${
                    selectedDay === 'mie' ? 'bg-white text-black' : 'bg-gray-900 text-white'
                  }`}
                >
                  Mié<br />22/Oct
                </button>
              </div>

              {/* Selectores Formato e Idioma */}
              <div className="flex gap-4 max-w-sm">
                <select
                  value={selectedFormato}
                  onChange={(e) => setSelectedFormato(e.target.value)}
                  className="flex-1 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg border border-gray-700 focus:outline-none"
                >
                  <option value="" disabled>Formatos</option>
                  <option value="2d">2D</option>
                  <option value="3d">3D</option>
                  <option value="imax">IMAX</option>
                </select>

                <select
                  value={selectedIdioma}
                  onChange={(e) => setSelectedIdioma(e.target.value)}
                  className="flex-1 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg border border-gray-700 focus:outline-none"
                >
                  <option value="" disabled>Idioma</option>
                  <option value="espanol">Español</option>
                  <option value="ingles">Inglés</option>
                  <option value="subtitulado">Subtitulado</option>
                </select>
              </div>
            </div>

            {/* Cine info */}
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

export default It;

