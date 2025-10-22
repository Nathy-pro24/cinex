import React, { useState } from 'react';

const Lobo = () => {
  const [activeDay, setActiveDay] = useState('hoy');
  const [selectedFormato, setSelectedFormato] = useState('2D');
  const [selectedIdioma, setSelectedIdioma] = useState('Español');

  // Horarios para cada combinación de día, formato e idioma
  const horarios = {
    hoy: {
      '2D': {
        Español: ['20:40 hs', '22:50 hs'],
        Inglés: ['19:00 hs', '21:10 hs'],
        Subtitulada: ['18:00 hs', '20:15 hs'],
      },
      '3D': {
        Español: ['17:30 hs', '20:00 hs'],
        Inglés: ['18:00 hs', '21:00 hs'],
        Subtitulada: ['19:00 hs'],
      },
      IMAX: {
        Español: ['16:00 hs', '19:30 hs'],
        Inglés: ['17:00 hs'],
        Subtitulada: ['18:30 hs', '21:00 hs'],
      },
    },
    mie: {
      '2D': {
        Español: ['20:40 hs', '22:50 hs'],
        Inglés: ['19:30 hs', '21:45 hs'],
        Subtitulada: ['18:15 hs', '20:30 hs'],
      },
      '3D': {
        Español: ['17:45 hs', '20:15 hs'],
        Inglés: ['18:30 hs', '21:15 hs'],
        Subtitulada: ['19:30 hs'],
      },
      IMAX: {
        Español: ['16:30 hs', '20:00 hs'],
        Inglés: ['17:30 hs'],
        Subtitulada: ['19:00 hs', '21:30 hs'],
      },
    },
  };

  // Obtener horarios actuales según selección o un array vacío si no hay datos
  const horariosParaMostrar =
    horarios[activeDay]?.[selectedFormato]?.[selectedIdioma] || [];

  // Completar hasta 3 horarios con '—' si faltan
  const horariosExtendidos = [...horariosParaMostrar];
  while (horariosExtendidos.length < 3) {
    horariosExtendidos.push('—');
  }

  return (
    <div className="bg-black text-white min-h-screen px-6 py-12 font-sans">
      <div className="max-w-6xl mx-auto bg-stone-900 rounded-lg shadow-lg overflow-hidden">

        <div className="flex flex-col md:flex-row">

          {/* Portada + Sinopsis a la izquierda */}
          <div className="md:w-1/3 bg-stone-800 flex flex-col items-center p-4 space-y-6">
            <img
              src="/corazon.jfif"
              alt="El Corazón de Lobo - Portada"
              className="w-full max-h-[400px] object-contain rounded-lg shadow-2xl"
            />
            {/* Sinopsis */}
            <div>
              <h2 className="text-xl font-semibold text-red-500 mb-2 text-center md:text-left">🧟 Sinopsis</h2>
              <p className="text-gray-300 leading-relaxed text-center md:text-left">
                Aquiles, un niño ashaninka de nueve años, es secuestrado de su aldea por Sendero Luminoso y, forzado a convivir y
                crecer dentro del movimiento terrorista, sobrevive impulsado por su obsesión de fugar y encontrar a su padre.
              </p>
            </div>
          </div>

          {/* Contenido a la derecha */}
          <div className="md:w-2/3 p-8 space-y-10">

            {/* Título */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-red-600 mb-2">🎬 El Corazón de Lobo</h1>
              <p className="text-gray-400 text-sm italic">Drama · Thriller</p>
            </div>

            {/* Información básica */}
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-300">
              <p><span className="font-semibold text-white">Duración:</span> 1h 39m</p>
              <p><span className="font-semibold text-white">Clasificación:</span> M14</p>
              <p><span className="font-semibold text-white">Formato:</span> 2D</p>
            </div>

            {/* Detalles de la función */}
            <div>
              <h2 className="text-xl font-semibold text-red-500 mb-2">🎟️ Detalles de la Función</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li><span className="font-semibold text-white">Idioma:</span> Español</li>
                <li><span className="font-semibold text-white">Fecha de estreno:</span> 02 Octubre, 2025</li>
                <li><span className="font-semibold text-white">Distribuidor:</span> CINEX</li>
              </ul>
            </div>

            {/* Horarios estilo pestañas y dropdowns */}
            <div>
              <h2 className="text-2xl font-bold mb-4 uppercase">HORARIOS</h2>

              {/* Pestañas */}
              <div className="inline-flex rounded-lg overflow-hidden border border-white mb-4 text-sm font-extrabold uppercase">
                <button
                  onClick={() => setActiveDay('hoy')}
                  className={`px-10 py-3 focus:outline-none transition-colors duration-200 ${
                    activeDay === 'hoy'
                      ? 'bg-white text-black'
                      : 'bg-neutral-900 text-white hover:bg-neutral-700'
                  }`}
                  style={{ borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem' }}
                >
                  HOY
                </button>
                <button
                  onClick={() => setActiveDay('mie')}
                  className={`px-10 py-3 focus:outline-none transition-colors duration-200 border-l border-white ${
                    activeDay === 'mie'
                      ? 'bg-white text-black'
                      : 'bg-neutral-900 text-white hover:bg-neutral-700'
                  }`}
                  style={{ borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}
                >
                  MIÉ <br /> 22/OCT
                </button>
              </div>

              {/* Dropdowns */}
              <div className="gap-4 mb-6">
                <select
                  value={selectedFormato}
                  onChange={(e) => setSelectedFormato(e.target.value)}
                  className="bg-neutral-900 border border-white text-white rounded-md px-4 py-2 cursor-pointer focus:outline-none text-sm font-extrabold uppercase"
                >
                  <option value="2D">2D</option>
                  <option value="3D">3D</option>
                  <option value="IMAX">IMAX</option>
                </select>

                <select
                  value={selectedIdioma}
                  onChange={(e) => setSelectedIdioma(e.target.value)}
                  className="bg-neutral-900 border border-white text-white rounded-md px-4 py-2 cursor-pointer focus:outline-none text-sm font-extrabold uppercase"
                >
                  <option value="Español">Español</option>
                  <option value="Inglés">Inglés</option>
                  <option value="Subtitulada">Subtitulada</option>
                </select>
              </div>

              {/* Horarios según selección */}
              <div className="bg-stone-800 rounded-md p-4 text-gray-300 font-semibold grid grid-cols-3 gap-4 text-center">
                {horariosExtendidos.map((hora, index) => (
                  <div key={index}>{hora}</div>
                ))}
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

export default Lobo;


