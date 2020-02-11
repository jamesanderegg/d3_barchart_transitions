import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import * as d3 from "d3";

import Barchart from "./Barchart";

const Svg = styled.svg`
  width: 100vw;
  height: 100vh;
  background: #0b0c10;
`;

const Year = styled.text`
fill: white;
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
font-size: 120px;
font-weight: bold;
text-anchor: end;
`;
const getTeam = row =>
  (row['team']);
const getYear = row =>
  Number(row['year']);
const getRank = row =>
  Number(row['rank']);
const getOBP = row =>
    Number(row['obp']);
const useData = () => {
  const [data, setData] = useState(null);


  useEffect(function()
  {
    (async () => 
    {
      
      const datas = await Promise.all([
        d3.csv('data/all_data.csv', row => ({
            team: getTeam(row),
            rank: getRank(row),
            year: getYear(row),
            onBase: getOBP(row),
            
      }))]);
      const data = datas.flat()
      
    setData(data);
    })();
  }, []);

  return data;
};
function App() {
  const data = useData();
  const [currentYear, setCurrentYear] = useState(1940);
  const [finalData, setFinalData] = useState([])
  const test = useRef([])

  //main animation a simple counter
  useEffect(() => {
    const interval = d3.interval(() => {
      setCurrentYear(year => {
        if(year +1 > 2019){
          interval.stop();
        }
        
      
        return year + 1;
      });
    }, 2500);
    
    return () => interval.stop();
    
  }, [data]);


  useEffect(() => {
    
    let dict = []  
      
    for (let d in data){
      if(data[d].year === currentYear){
        //first iteration
        dict.push({
          team: data[d].team,
          rank: data[d].rank,
          year: data[d].year,
          onBase: data[d].onBase,
        })   
      }
    }

    test.current=dict
  },[currentYear,data])
 
  return (
    <Svg>
      {data ? (
        
        <Barchart data={test.current}
        x={140} 
        y={50} 
        barThickness={20} 
        width={300} />
      ) : null}
      <Year x={"95%"} y={"95%"} >{currentYear}</Year>
    </Svg>
  );
}

export default App;
