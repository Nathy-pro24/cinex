// npm install react-router-dom
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import Hero from './components/hero'
import Contenido from './components/contenido'
import Footer from './components/footer'
import Basta from './components/formulario'
import CompraRapida from './components/comprarapida'
import Lobo from './components/lobo'
import Hermanastra from './components/hermanastra'
import It from './components/it'
import Nanito from './components/nanito'
// Mis paginas
import Contacto from './pages/contacto'
import ListaPeliculas from './components/peliculas'
import Carrusel from './components/carrusel'

function App() {
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route 
            path='/'
            element={
            <>
            <Hero />
            </>}
          />
          
          <Route 
            path='/contacto'
            element={
            <>
            
            <Basta />
            </>
            }
          />
          <Route 
            path='/peliculas'
            element={
            <>
            <Header />
              <Carrusel />
            <ListaPeliculas />
            <CompraRapida />
            </>

          }
          />

          <Route path='alimentosybebidas'  element={
            <>
            <Header />
            <Contenido />
            </>

          }/>

          <Route path='/it'  element={
            <>
            <Header />
            <It />
            </>

          }/>

          <Route path='/lobo'  element={
            <>
            <Header />
            <Lobo />
            </>
            }/>

            <Route path='/hermanastra'  element={
            <>
            <Header />
            <Hermanastra />
            </>
          }/>


          <Route path='/nanito'  element={
            <>
            <Header />
            <Nanito />
            </>

          }/>
        </Routes>
        
        <Footer />

      </BrowserRouter>
    </>
  )
}

export default App
