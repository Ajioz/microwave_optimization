import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Loading from '../Loading/Loading'
import APIService from '../ApiService';
import './form.css'


export default function Form({setSwapPage, setData}) {

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
            return {...values, [prop] : Number(e.target.value)} 
            })
      }

      const handleSubmit = (e) => {
            e.preventDefault();
            APIService.Execute(values)
            .then((res) => {
                 if(res.error) {setIsModal(false)}
                 else {setData(res); setIsModal(true); }
            })
            .catch((error) => {console.error('Error:', error);});
            setValues({ LTX: '', LRX: '', PTX: '', PRX: '', GRX: '', GTX: '', RSX: '', Frequency: ''})
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
                  required
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
                  required
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
                  required
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
                  required
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
            required
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
                  required
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
                  required
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
                  required
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
