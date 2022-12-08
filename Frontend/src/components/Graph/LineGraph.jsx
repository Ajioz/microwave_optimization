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

const PairedGraph = ({line, my_round}) => {

  let {x1, y1} = line;
  let y_value = y1.map((y) => my_round(y));
  let paired = arrayCreate(x1, y_value);

  const config = {
        series: [
            {
            name: "Margin",
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
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Margin vs Distance',
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
              text: 'Distance',
              offsetY: 74
            },
         },
          yaxis: {
            title: {
              text: 'Margin'
            },
            min: -6,
            max: 11
          },
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

export default PairedGraph;
