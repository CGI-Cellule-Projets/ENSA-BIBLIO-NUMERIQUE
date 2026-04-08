import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/register';
import Filiere_page from './components/Filieres_page';

function App() {

  const Homepage = () => (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  )

  const Login_page = () => (
    <>
      <Navbar />
      <Login />
    </>
  )

  const Register_page = () => (
    <>
      <Navbar />
      <Register />
    </>
  )

  const Filiere_pages = () => (
    <>
      <Navbar />
      <Filiere_page />
      <Footer />
    </>
  )


  return (
    <Routes>
      <Route path='/home' element={<Homepage />} />
      <Route path='/login' element={<Login_page />} />
      <Route path = '/register' element={<Register_page />} />
      <Route path='/filiere' element={<Filiere_pages />} />
    </Routes>
  )
}

export default App
