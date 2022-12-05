import React from "react";
import Chart from "react-apexcharts";

const arrayCreate = (input_1, input_2) => {
    let df = [];
    let max_size = 1;
    for(let i= 0; i<input_1.length; i++){
      let small_df = [];
      for(let j=0; j<max_size; j++){
        small_df.push(input_1[i])
        small_df.push(input_2[i])
      }
      df.push(small_df);
    }
    return df
}

const BellGraph = ({bell, my_round}) => {

  let {x_data, y_data} = bell;
  let y_value = y_data.map((y) => my_round(y));
  let x_value = x_data.map((x) => my_round(x));
  let paired = arrayCreate(x_value, y_value);

  const config = {
        series: [
            {
            name: "Probability Density",
            data: paired,
        }
    ],
        options: {
          chart: {
            height: 450,
            type: 'line',
            zoom: {
              enabled: true
            }
          },
          colors: ['#d32f2f'],
        
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Guassian Estimation',
            align: 'center'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
         xaxis: {
            type: 'numeric',
             title: {
              text: 'Proposed Distance',
              offsetY: 74
            },
            min: 3.5,
            max: 6.0
         },
          yaxis: {
            title: {
              text: 'Probability Density'
            },
          },
        },
  };
  return (
    <>
      <Chart
        options={config.options}
        series={config.series}
        type="line"
        width="550px"
        height="450px"
        margin='10px'
      />
    </>
  );
};

export default BellGraph;
