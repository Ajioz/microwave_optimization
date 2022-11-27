import React, { useState, useRef, useEffect } from 'react'
import { grey } from '@mui/material/colors';
import { FaBars } from 'react-icons/fa'
import { links } from './data'
import logo from './logo.png'
import './navbar.css'
import { Facebook, Instagram, LinkedIn, Twitter, WhatsApp } from '@mui/icons-material';



const style =  (props) => ({
    boxSizing: 'border-box', 
    width: '40px',
    height: '40px', 
    padding: '7px',
    margin: '0 5px',
    boxShadow:'0 5px 3px rgba(0,0,0,0.3)',
    background: 'linear-gradient(0deg, #ddd, #fff)',
    transition: '0.5s',
    borderRadius:'50%',
    color: grey[600],
    '&:hover':{
        color: props,
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
    }
})

const Navbar = () => {

  const [show, setShow] = useState(false);
  const linksContainerRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    show ? linksContainerRef.current.style.height = `${linksHeight}px` : linksContainerRef.current.style.height = '0px'
    return () => {}
  }, [show])

  return (
    <nav>
        <div className="nav-center">
            <div className="nav-header">
              <img src={logo} alt="logo" className='logo'/>
              <button className="nav-toggle" onClick={()=> setShow(!show)}>
                <FaBars />
              </button>
            </div>
            {/* <div className = {`links-container ${show && 'show-container'}`}> */}
            <div className = 'links-container' ref={linksContainerRef} >
              <ul className="links" ref={linksRef}>
               {links.map((link)=>{
                 const { id, url, text } = link;
                 return( <li key={id}><a href={url}>{text}</a></li> )
               })}
              </ul>  
            </div>
             <div direction='row'
                sx={{margin: '20px 0', width:'100%', justifyContent: 'space-evenly', alignItems:'center'}} className="social-icons">
                    <Facebook  sx={style('#1877F2')}  /> 
                    <Twitter   sx={style('rgb(29, 161, 242)')}/>
                    <Instagram sx={style('#E4405F')}/>
                    <LinkedIn  sx={style('#0e76a8')}/>
                    <WhatsApp  sx={style('#128C7E')} />
            </div>
        </div>
    </nav>
  )
}

export default Navbar
