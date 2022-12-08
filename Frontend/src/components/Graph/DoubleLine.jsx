import React from "react";
import Chart from "react-apexcharts";



const arrayCreate = (input_1, input_2, input_3,input_4) => {
    let df = [];
    let max_size = 1;
    for(let i= 0; i<input_1.length; i++){
      let small_df = [];
      for(let j=0; j<max_size; j++){
        small_df.push(input_1[i])
        small_df.push(input_2[i])
        small_df.push(input_3[i])
        small_df.push(input_4[i])
      }
      df.push(small_df);
    }
    return df
}

const DoubleLine = ({line, my_round}) => {
  /*
      y1 = margin
      y2 = Av_con
      y3 = FM_con

      # y-axis values
      x1 = distance
   */

  let {x1, y1, y2, y3} = line;
  let y_value = y1.map((y) => my_round(y));
  let y2_value = y2.map((y) => my_round(y));
  let y3_value = y3.map((y) => my_round(y));

  arrayCreate(x1, y_value, y2_value, y3_value);


  const config = {
        series: [
              {
                name: "Margin",
                data: y_value
              },
              {
                name: "AVr",
                data: y2_value
              },
              {
                name: "FM",
                data: y3_value
              }
            ],
            options: {
              chart: {
                height: 350,
                type: 'line',
                dropShadow: {
                  enabled: true,
                  color: '#000',
                  top: 18,
                  left: 7,
                  blur: 10,
                  opacity: 0.2
                },
                toolbar: {
                  show: true
                }
              },
              colors: ['#d32f2f', '#00695c', '#424242'],
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: 'smooth'
              },
              title: {
                text: 'Distance Vs Margin Vs Rain Attenuation [ scale: -30 ]',
                align: 'center'
              },
              grid: {
                borderColor: '#e7e7e7',
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              markers: {
                size: 1
              },
              xaxis: {
                categories: x1,
                title: {
                  text: 'Distance',
                  offsetY: 74
                }
              },
              yaxis: {
                title: {
                  text: 'Margin'
                },
                min: -6,
                max: 11
              },
              legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: 15,
                offsetX: -5
              }
            },
  };
  return (
    <>
      <Chart
        options={config.options}
        series={config.series}
        type="line"
        width="850px"
        height="450px"
        margin='10px'
      />
    </>
  );
};

export default DoubleLine;
