import React from 'react';
import LineGraph from './LineGraph'
import DoubleLine from './DoubleLine'
import BellGraph from './BellGraph'
import './graph.css'






const Graph = ({bell, line, my_round}) => {

  return (
    <>
        <div className="graph">
            <BellGraph bell={bell} my_round={my_round}/>
            <div className="space"></div>
            <LineGraph line={line} my_round={my_round}/>
            <div className="space"></div>
            <DoubleLine line={line} my_round={my_round}/>
           
        </div>
    </>
  )
}

export default Graph