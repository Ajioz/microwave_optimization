import React, { useState } from 'react'
import cn from 'classnames'
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion'
import './flip.css'
import Form from '../Form/Form'

export default function FlipCard({setSwapPage, setData}) {

  const [isFlipped, setIsFlipped] = useState(false)
  const [check, setCheck] = useState(false)

  const classes = cn({
    'card': true,
    'flipped': isFlipped,
  
  })


  const divVariants = {
    show: { 
      transition: {
        staggerChildren: .4,
        delayChildren: .8,
      }
    },
    hide: { 
      transition: {
        staggerChildren: .1,
        staggerDirection: -1,
        delayChildren: .4
      }
     },
     check: { 
      transition: {
        staggerChildren: .2,
        staggerDirection: -1,
      }
     }
  }

  const buttonVariants = {
    show: { 
      y: 0, 
      opacity: 1,
      height: 'auto'
    },
    hide: { 
      y: -20, 
      opacity: 0, 
      height: 0 
    },
    check: { 
      y: 0, 
      x: -40, 
      opacity: 0,
      height: 'auto'
    }
  }

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
                  <Form setData={setData} setSwapPage ={setSwapPage}/>
                </motion.div>
              </div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

