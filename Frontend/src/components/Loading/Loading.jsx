import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import ReactLoading from "react-loading";
import Modal from '@mui/material/Modal';



const style = {
  position: 'absolute',
  top: '45%',
  left: '60%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'transparent',
  border: 'none',
  p: 4,
};

export default function Loading({open, setOpen, data, setSwapPage, setNetwork}) {
    useEffect(() => {
      if(data.AVr) {
        setSwapPage(open)
      }
      let timer = setTimeout(()=>{
          setOpen(!open)
          setNetwork(true)
      }, 5000)
      return () => {
        clearTimeout(timer)
      }
    }, [setOpen, data, setNetwork, open, setSwapPage])
    

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" >
        <Box sx={style}>
          <ReactLoading type="bars" color="#64b5f6" width={100} />
        </Box>
      </Modal>
    </div>
  );
}
