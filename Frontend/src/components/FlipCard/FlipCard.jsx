import React, { useState } from 'react'
import cn from 'classnames'
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion'
import './flip.css'
import Form from '../Form/Form'

export default function FlipCard({setSwapPage, setData, data}) {

  const [isFlipped, setIsFlipped] = useState(false)


  const classes = cn({
    'card': true,
    'flipped': isFlipped,
  
  })

  const handleFlip = () => {
    setIsFlipped(true)
  }

  return (
    <div className="container">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={classes} 
        style={{
          width: 600,
          height: 600,
        }}
        onClick={handleFlip}>
        <div className="content">
          <div className="front-card">
              <div className="card-img"></div>
              <p>Rain fading is a major limiting factor to terrestrial line-of-sight operating above 10GHz. 
                The impact of rain on radio waves at this frequency causes interference with signal.
              </p>
              <p>This project aims at optimizing link budget, by way of finding the best distance between transceivers,
                while mitigating against the long standing problem between rain presence, and bad signal reception syndrome. 
              </p>
              <div className="btn-center">
                <button className="btn">start</button>
              </div>
          </div>
          <AnimatePresence>
              <div className="back-card">
                <motion.div  className="form"    >
                  <Form setData={setData} data ={data} setSwapPage ={setSwapPage}/>
                </motion.div>
              </div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

