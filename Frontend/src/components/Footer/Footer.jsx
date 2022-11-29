import React from 'react'
import {  LinkedIn } from '@mui/icons-material';
import './footer.css'


const Footer = () => {

  return (
    <div className='footer'>
        <p>Copyright &copy; |</p> <p>{new Date().getFullYear()}</p> <p> All right reserved - <strong> Idim Aniebiet</strong>&nbsp;|</p>
        <p> Powered by &nbsp;Ajiozi</p>
        <a href="https://www.linkedin.com/in/ajioz/" target="_blank" rel="noreferrer">
           <LinkedIn  sx={{color :'#0e76a8' }}/>
        </a>
          
    </div>
  )
}

export default Footer