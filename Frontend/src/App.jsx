import React from 'react'
import FlipCard from './components/FlipCard/FlipCard'
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './app.css'


function App() {
  return (
    <>
      <Navbar />
      <Header />
      <div className='app'>
        <FlipCard />
      </div>
      <Footer />
    </>
  )
}

export default App
