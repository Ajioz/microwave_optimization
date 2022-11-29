import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Loading from '../Loading/Loading'
import './form.css'


export default function Form({setSwapPage}) {

      const [isModal, setIsModal] = useState(false)
   
      const [values, setValues] = useState({
            LTX: '',
            LRX: '',
            PTX: '',
            PRX: '',
            GRX: '',
            GTX: '',
            RSX: '',
            Frequency: '',
      });


      const handleChange = (prop) => (e) => {
            setValues((values) => {
            return {...values, [prop] : e.target.value} 
            })
      }

      const handleSubmit = (e) => {
            e.preventDefault();
            console.log(values);
            setIsModal(true);
            setValues({ LTX: '',
                  LRX: '',
                  PTX: '',
                  PRX: '',
                  GRX: '',
                  GTX: '',
                  RSX: '',
                  Frequency: '',
            })
      }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className="form-container">
            <TextField
            label="LTX"
            name='LTX'
            id="outlined-start-adornment"
            sx={{ m: 2, width: '20ch' }}
            placeholder='Enter Number'
            size="small"
            value={values.LTX}
            onChange={handleChange("LTX")}
            InputProps={{
                  startAdornment: <InputAdornment position="start" ></InputAdornment>,
            }} />
            
            <TextField
            label="LRX"
            name='LRX'
            id="outlined-start-adornment"
            sx={{ m: 2, width: '20ch' }}
            placeholder='Enter Number'
            size="small"
            value={values.LRX}
            onChange={handleChange("LRX")}
            InputProps={{
                  startAdornment: <InputAdornment position="start" ></InputAdornment>,
            }} />
      </div>
      <div className="form-container"> 
      <TextField
      label="PTX"
      name='PTX'
      id="outlined-start-adornment"
      sx={{ m: 2, width: '20ch' }}
      placeholder='Enter Number'
      size="small"
      value={values.PTX}
      onChange={handleChange("PTX")}
      InputProps={{
            startAdornment: <InputAdornment position="start" ></InputAdornment>,
      }} />

      <TextField
      label="PRX"
      name="PRX"
      id="outlined-start-adornment"
      sx={{ m: 2, width: '20ch' }}
      placeholder='Enter Number'
      size="small"
      value={values.PRX}
      onChange={handleChange("PRX")}
      InputProps={{
      startAdornment: <InputAdornment position="start" ></InputAdornment>,
      }} />
      </div>
      <div className="form-container">
      <TextField
      label="GRX"
      name="GRX"
      id="outlined-start-adornment"
      sx={{ m: 2, width: '20ch' }}
      placeholder='Enter Number'
      size="small"
      value={values.GRX}
      onChange={handleChange("GRX")}
      InputProps={{
      startAdornment: <InputAdornment position="start" ></InputAdornment>,
      }} />

      <TextField
      label="GTX"
      name="GTX"
      id="outlined-start-adornment"
      sx={{ m: 2, width: '20ch' }}
      placeholder='Enter Number'
      size="small"
      value={values.GTX}
      onChange={handleChange("GTX")}
      InputProps={{
      startAdornment: <InputAdornment position="start" ></InputAdornment>,
      }} />
      </div>
      <div className="form-container">
      <TextField
      label="RSX"
      name="RSX"
      id="outlined-start-adornment"
      sx={{ m: 2, width: '20ch' }}
      placeholder='Enter Number'
      size="small"
      value={values.RSX}
      onChange={handleChange("RSX")}
      InputProps={{
      startAdornment: <InputAdornment position="start" ></InputAdornment>,
      }} />

      <TextField
      label="Frequency"
      name="Frequency"
      id="outlined-start-adornment"
      sx={{ m: 2, width: '20ch' }}
      placeholder='Enter Number'
      size="small"
      value={values.Frequency}
      onChange={handleChange("Frequency")}
      InputProps={{
      startAdornment: <InputAdornment position="start" ></InputAdornment>,
      }} />
      </div>
      <div className="btn-center">
      <button className="btn" type='submit'>execute </button>
      </div>
      {isModal && <Loading open ={isModal} setOpen={setIsModal} setSwapPage={setSwapPage}/>}
    </form>
  );
}
