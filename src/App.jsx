import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas} from './components'

const App = () => {
  return (
    <BrowserRouter>
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center"> 
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />  
      <Works />
      <Feedbacks />
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
      {/* ToastContainer placed at app root so toasts can appear from anywhere */}
      <ToastContainer />
    </div>
    </BrowserRouter>
  )
}

export default App