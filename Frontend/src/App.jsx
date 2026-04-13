import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/register';
import Filiere_page from './components/Filieres_page';
import Modules from './components/Modules';
import Form from './components/Form';

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

  const Modules_page = () => (
    <>
        <Navbar />
        <Modules />
        <Footer />
    </>
  )

  const Form_page = () => (
    <>
      <Navbar />
      <Form />
      <Footer />
    </>
  )


  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/login' element={<Login_page />} />
      <Route path = '/register' element={<Register_page />} />
      <Route path="/filiere/:filiere_id/semester/:semester_num/modules" element={<Modules_page />} />
      <Route path='/filiere' element={<Filiere_pages />} />
      <Route path='/form' element={ <Form_page /> } />
    </Routes>
  )
}

export default App
