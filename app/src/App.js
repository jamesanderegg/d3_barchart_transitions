import React from 'react';
import styled from "styled-components";
import * as d3 from 'd3';

import Barchart from "./Barchart"


const Svg = styled.svg`
  width: 100vw;
  height: 100vh;
  background: #0b0c10;
`;
function App() {
  
  const processors = d3.range(5).map(i =>  `${i} CPU` ),
    random = d3.randomUniform(1000, 50000);

  const data = d3.range(1970,2025).map(year => 
    d3.range(5).map(i => ({
      year: year,
      name: processors[i],
      transistors: Math.round(random())
  })))

  return (
    <Svg>
      <Barchart 
        data={data[0]} 
        x={100} 
        y={50} 
        barThickness={20} 
        width={500} />
    </Svg>
  );
}

export default App;
