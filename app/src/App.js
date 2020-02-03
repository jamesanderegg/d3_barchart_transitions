import React from 'react';
import styled from "styled-components";
import * as d3 from 'd3';

const Svg = styled.svg`
  width: 100vw;
  height: 100vh;
  background: #0b0c10;
`;
function App() {
  
  const processors = d3.range(5).map( => ),
  random = d3.randomUniform(1000, 50000);

  const data = d3.range(1970,2025).map(year => 
    d3.range(5).map(i => ({
    year: year,
    name: processors[i],
    transistors: Math.round(random())
  })))

  return (
    <Svg></Svg>
  );
}

export default App;
