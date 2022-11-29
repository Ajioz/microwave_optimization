import React, { useState, useEffect } from "react";
import "./output.css";


const Output = ({data}) => {
    console.log(data)
    const {AVr, AVr_con, Distance, FLs, FM, FM_con, Ki, LoS, Margin, PRx, Vertical_Polarization, Z_inputs} = data;
    const [search, setsearch] = useState(0);
    const [sliderState, setSliderState] = useState(true);

    const autoChange = () => {
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
                autoChange();
            },100);
        return() => clearInterval(sliderForward);
    });

  function my_round(number, precision = 100) {
      let result = number *  precision;
      return Math.trunc(result) / precision 
  }



  return (
      <div className="cover">
        <div className="abrief">
          <div className="left"></div>
          <div className="center">
            <p>Distance: <strong>{!sliderState && my_round(Distance[Distance.length-1])}km</strong></p>
            <p>FM: <strong>{!sliderState && my_round(FM[FM.length-1])}dB</strong></p>
            <p>Rain Fading: <strong>{!sliderState && my_round(AVr[AVr.length-1])}dB</strong></p>
          </div>
          <div className="right"></div>
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
                <div className="btn-center">
                  <button className="btn" type='submit'>generate Graph </button>
                </div>
                <div className="btn-center">
                  <button className="btn" type='submit'>csv Report</button>
                </div>
            </div>
        </div>  
  )
}

export default Output
