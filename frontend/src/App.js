import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
// to test login and password
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// import HomeScreen from './screens/homeScreen'
import { Outlet } from 'react-router-dom'




const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App