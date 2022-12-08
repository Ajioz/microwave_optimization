import React, {useState} from 'react'
import FlipCard from './components/FlipCard/FlipCard'
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './app.css'
import Output from './components/Output/Output'



function App() {

  const [swapPage, setSwapPage] = useState(false)
   const [data, setData] = useState([])

  return (
    <>
      <Navbar />
      <Header />
      <div className='app'>
       { swapPage ? <Output data={data} /> : <FlipCard setData={setData} data ={data} setSwapPage= {setSwapPage}/> }
      </div>
      <Footer />
    </>
  )
}

export default App
