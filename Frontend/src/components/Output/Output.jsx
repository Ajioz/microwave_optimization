import React, { useState, useEffect } from "react";
import ExportCSV from "../ExportCSV/ExportCSV";
import APIService from '../ApiService';
import { Assessment } from "@mui/icons-material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Graph from '../Graph/Graph'
import BellGraph from '../Graph/BellGraph'
import DoubleLine from '../Graph/DoubleLine'
import LineGraph from '../Graph/LineGraph'
import "./output.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '80%',
  minWidth: '270px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  zIndex: 100,
  margin: '40px',
  '@media(max-height: 890px)': {
        top: '0',
        transform: 'translate(-50%, 0%)'
    }
};

const graphStyle =  () => ({
    boxSizing: 'border-box', 
    width: '40px',
    height: '40px', 
    bgcolor:'azure',
    margin: '0 5px',
    fontSize: '50px',
    boxShadow:'0 3px 3px rgba(0,0,0,0.3)',
    transition: '0.5s',
    '&:hover':{
        boxShadow: '0 1px 1px rgba(0,0,0,0.3)'
    }
  })
  
  const Output = ({data}) => {
    const {AVr, AVr_Con, Distance, FM, FM_Con, Margin} = data;
    const [search, setsearch] = useState(0);
    const [sliderState, setSliderState] = useState(true);
    const [report, setReport] = useState(false)
    const [graphs, setGraphs] = useState()


    const [graph, setGraph] = useState(false)
    const [openA, setOpenA] = useState(false)
    const [openB, setOpenB] = useState(false)
    const [openC, setOpenC] = useState(false)
    const [openD, setOpenD] = useState(false)

    const handleOpenA = () => setOpenA(true);
    const handleOpenB = () => setOpenB(true);
    const handleOpenC = () => setOpenC(true);
    const handleOpenD = () => setOpenD(true);

    const handleClose = () => {
      setOpenA(false)
      setOpenB(false)
      setOpenC(false)
      setOpenD(false)
    };

    const treeSearch = () => {
        if(sliderState){
            if(search < Distance.length-1){
                setsearch(search + 1 );
            }
            if(search === Distance.length-1){
                setsearch(Distance.length-1);
                setSliderState(false);
            }    
        }
    }

    useEffect(() => {
      let sliderForward =  setInterval(() => {
              treeSearch();
          },100);
      return() => clearInterval(sliderForward);
    });

  function my_round(number, precision = 100) {
      let result = number *  precision;
      return Math.trunc(result) / precision 
  }

  const handleReport = (e) =>{
    e.preventDefault();
    APIService.Report()
    .then((res) => {
      if(res.status) setReport(true) 
    })

  }

  const handleGraph = () => {
    setGraph(true);
    const data = {'distance': Distance, 'margin': Margin, 'FM':FM, 'Av': AVr, 'FM_con': FM_Con, 'Av_con': AVr_Con};
    APIService.Graph(data)
    .then((graphs)=>{
     setGraphs(graphs)
     console.log(graphs)
    })
  }


  return (
      <div className="cover">

        <div className="abrief">
            <div className = { !sliderState ? "left": "left-static"} ></div>
            <div className="center">
              { !sliderState && 
                  <div>
                    <p>Distance: <strong>{my_round(Distance[Distance.length-1])}km</strong></p>
                    <p>FM: <strong>{my_round(FM[FM.length-1])}dB</strong></p>
                    <p>Rain Fading: <strong>{my_round(AVr[AVr.length-1])}dB</strong></p>
                    <p>Margin (FM-AVr): <strong>{my_round(Margin[Margin.length-1])}dB</strong></p>
                  </div>
              }
            </div>
           <div className={ !sliderState ? "right": "right-static"}></div>
        </div>

        <div className="container">
            <div className="params">
              <div className="count button-71">
                {my_round(Distance[search])}km
              </div>
              <p>Optimized Distance</p>
            </div>

            <div className="params">
              <div className="count button-91">
                {my_round(AVr[search])}dB
              </div>
              <p>Rain Attenuation</p>
            </div>

            <div className="params">
              <div className="count button-90">
                {my_round(FM[search])}dB
              </div>
              <p>Fade Margin</p>
            </div>
        </div>

        <div className="btn-cover">
            <div id="btn-center">
              <button id="btn" type='submit' 
                onClick={handleGraph} 
                disabled={sliderState} >
                  generate Graphs
              </button>
              { graph && 
              <div className="graphs">
                <Assessment sx={graphStyle} onClick={handleOpenA}/>    
                <Assessment sx={graphStyle} onClick={handleOpenB}/>    
                <Assessment sx={graphStyle} onClick={handleOpenC}/>    
                <Assessment sx={graphStyle} onClick={handleOpenD}/>    
              </div>
              }
               <Modal
                  open={openA}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description" 
                  sx={{overflowY: 'scroll'}}
                  disableScrollLock={false}>
                    <Box sx={style}>
                        <BellGraph bell={graphs?.gaussian} my_round={my_round} />
                    </Box>
              </Modal>
               <Modal
                  open={openB}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description" 
                  sx={{overflowY: 'scroll'}}
                  disableScrollLock={false}>
                    <Box sx={style}>
                        <LineGraph line={graphs?.comparison} my_round={my_round}/>
                    </Box>
              </Modal>
               <Modal
                  open={openC}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description" 
                  sx={{overflowY: 'scroll'}}
                  disableScrollLock={false}>
                    <Box sx={style}>
                        <DoubleLine line={graphs?.comparison} my_round={my_round}/>
                    </Box>
              </Modal>
               <Modal
                  open={openD}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description" 
                  sx={{overflowY: 'scroll'}}
                  disableScrollLock={false}>
                    <Box sx={style}>
                        <Graph bell={graphs?.gaussian} line={graphs?.comparison} my_round={my_round}/> 
                    </Box>
              </Modal>
            </div>
            <div id="btn-center">
              <button id="btn" type='submit' onClick={handleReport} disabled={sliderState}>generate csv</button>
              {report && <ExportCSV data={data}/>}
            </div>
        </div>

    </div>  
  )
}

export default Output
