import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import ReactLoading from "react-loading";
import Modal from '@mui/material/Modal';

let loading = false;
let loaded = true;


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

export default function Loading({open, setOpen, setSwapPage, data}) {
    useEffect(() => {
      setTimeout(()=>{
        if(loaded) {
          setOpen(!open)
          setSwapPage(open)
        }
      }, 3000)
    }, [setOpen])
    

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
