import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Close, PhotoCamera, Send } from '@mui/icons-material';
import { Stack } from '@mui/system';
import { Button } from '@mui/material';


export default function Form({setOpen}) {
//   const [values, setValues] = React.useState({
//     amount: '',
//     password: '',
//     weight: '',
//     weightRange: '',
//     showPassword: false,
//   });

//   const handleChange = (prop) => (event) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };

//   const handleClickShowPassword = () => {
//     setValues({
//       ...values,
//       showPassword: !values.showPassword,
//     });
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

  return (
    <Stack direction='column'alignItems="flex-end" sx={{width: '50%', minHeight: '40vh', background: 'white', padding: '10px 0px', }}>
       
        <Box  component="form"  sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', padding: '30px 0px', margin: '0 auto', justifyContent: 'center' }}>
        <div>
            <TextField
            label="First Name"
            id="outlined-start-adornment"
            sx={{ m: 2, width: '35ch' }}
            placeholder='John'
            size="small"
            InputProps={{
                startAdornment: <InputAdornment position="start" ></InputAdornment>,
            }} />
            
            <TextField
            label="Last Name"
            id="outlined-start-adornment"
            sx={{ m: 2, width: '35ch' }}
            placeholder='Doe'
            size="small"
            InputProps={{
                startAdornment: <InputAdornment position="start" ></InputAdornment>,
            }} />
           
        </div>
        </Box>
    </Stack>
  );
}
