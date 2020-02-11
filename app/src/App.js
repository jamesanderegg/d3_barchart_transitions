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

const Title = styled.text`
fill: white;
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
font-size: 36px;
font-weight: bold;
text-anchor: middle;
`;
const getTeam = row =>
  (row['team']);
const getYear = row =>
  Number(row['year']);
const getRank = row =>
  Number(row['rank']);
const getOBP = row =>
    Number(row['obp']);

const getWorldSeriesYear = row =>
  Number(row['Year']);
const winningTeam = row =>
  (row['Winning team']);
const losingTeam = row =>
  (row['Losing team']);
    
const useData = () => {
  const [data, setData] = useState(null);
  useEffect(function()
  {
    (async () => 
    {
      const datas = await Promise.all(
        [
          d3.csv('data/all_data.csv', row => ({
              team: getTeam(row),
              rank: getRank(row),
              year: getYear(row),
              onBase: getOBP(row),        
          })),
          d3.csv('data/winningLosing.csv', row => ({
            winning: winningTeam(row),
            winningYear: getWorldSeriesYear(row),
            losing: losingTeam(row),        
        })) 
        ]);
      const data = datas.flat()
      setData(data);
    })();
  }, []);

  return data;
};
function App() {
  const data = useData();
  const [currentYear, setCurrentYear] = useState(1939);
  const finalData = useRef([])
  const worldSeries = useRef({})

  //main animation a simple counter
  useEffect(() => {
    const interval = d3.interval(() => {
      setCurrentYear(year => {
        if(year +1 > 2019){
          interval.stop();
        }       
        return year + 1;
      });
    }, 4000);
    return () => interval.stop();  
  }, [data]);


  useEffect(() => {
    let dict = []
    let winner = []
    
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
      if(data[d].winningYear === currentYear){
        winner=data[d]
      } 
    }
    worldSeries.current=winner
    finalData.current=dict
  },[currentYear,data])
 
  
  return (
    <Svg>
    <Title x={"50%"} y={35}> MLB Regular Season: On Base Percentage</Title>
    
      {data ? (     
        <Barchart 
        data={finalData.current}
        x={140} 
        y={50} 
        barThickness={20} 
        width={300}
        worldSeries={worldSeries.current} />
        
      ) : null}
      
      <Year x={"95%"} y={"95%"} >{currentYear-1}</Year>
    </Svg>
  );
}

export default App;
