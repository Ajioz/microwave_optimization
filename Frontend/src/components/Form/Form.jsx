import React, { useState, useEffect } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Loading from '../Loading/Loading'
import APIService from '../ApiService';
import './form.css'


export default function Form({setSwapPage, setData, data}) {
      const [isModal, setIsModal] = useState(false)
      const [error, setError] = useState(false)
      const [network, setNetwork] = useState(false)
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
            setIsModal(true);
            let data = {}
            for(let key in values){
                  const value = Number(values[key])
                  if(isNaN(value)) setError(true)
                  data[key] =  value;
            }
            APIService.Execute(data)
            .then((res) => {
                 if(res.error) {setIsModal(false)}
                 else {setError(false);setData(res);}
            })
            .catch((error) => {console.error('Error:', error);});
            setValues({ LTX: '', LRX: '', PTX: '', PRX: '', GRX: '', GTX: '', RSX: '', Frequency: ''})
      }

      useEffect(() => {
        let timing = setTimeout(()=>{
            setError(false)
            setNetwork(false)
        }, 5000)
        return () => {
          clearTimeout(timing)
        }
      }, [error, network])
      

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
      { error && <div className="error">Opps! One or two input(s) is invalid, Try again!</div>}
      { network && <div className="error">Your network is unstable, refresh and try again!</div>}
      <div className="btn-center">
            <button className="btn" type='submit'>execute </button>
      </div>
      {isModal && <Loading 
            open ={isModal} 
            data={data} 
            setOpen={setIsModal} 
            setSwapPage={setSwapPage}
            setNetwork={setNetwork}/>
      }
    </form>
  );
}
