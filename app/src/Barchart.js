import React, { useEffect, useState, useMemo } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const Label = styled.text`
  fill: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 14px;
  text-anchor: end;
  alignment-baseline: middle;
`;
const EndLabel = styled.text`
  fill: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 14px;
  text-anchor: start;
  alignment-baseline: middle;
`;

const useTransition = ( {targetValue, name, startValue, easing }) => {
  const [renderValue, setRenderValue] = useState(startValue || targetValue);

  useEffect(() => {
      d3.selection()
          .transition(name)
          .duration(2000)
          .ease(easing || d3.easeLinear )
          .tween(name, ()=>{
              const interpolate = d3.interpolate(renderValue, targetValue);
              return t => setRenderValue(interpolate(t));
          })

    }, [targetValue, easing, name]);

    return renderValue;
};

const Bar = ({ data, y, width, thickness, color }) => {

   
    const renderWidth = useTransition({ 
      targetValue: width,
      name: `width-${data.team}`,
      easing: d3.easeExpInOut
    });

    const renderY = useTransition({
      targetValue: y,
      name: `y-${data.team}`,
      startValue: 500,
      easing:d3.easeCubicInOut
    });
    const renderX = useTransition({
        targetValue: 0, 
        name: `x-${data.team}`,
        startValue: 0,
        easing:d3.easeCubicInOut
    });

  return (
    <g transform={`translate(${renderX}, ${renderY})`}>
    <Label y={thickness / 2}>{data.team}</Label>
      <rect x={10} y={0} width={renderWidth} height={thickness} fill={color} />
      <EndLabel y={thickness/2 } x= {renderWidth + 15}>
        {data.onBase}
      </EndLabel>
    </g>
  );
};
//draws for single year
const Barchart = ({ data, x, y, barThickness, width }) => {
  //create scale for vertical alignment
  

  const yScale = d3
    .scaleBand()
    .domain( d3.range(0, data.length))
    .paddingInner(0.2)
    .range([data.length * barThickness, 0]);

  const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d.onBase)])
  .range([0, width]);

  const color = d3
    .scaleOrdinal()
    .domain([
      'Anaheim Angels','Arizona Diamondbacks','Atlanta Braves','Baltimore Orioles',
      'Boston Bees','Boston Braves','Boston Red Sox','Brooklyn Dodgers','California Angels',
      'Chicago Cubs','Chicago White Sox','Cincinnati Redlegs','Cincinnati Reds',
      'Cleveland Indians','Colorado Rockies','Detroit Tigers','Florida Marlins','Houston Astros',
      'Houston Colt 45\'s','Kansas City Athletics','Kansas City Royals','Los Angeles Angels',
      'Los Angeles Dodgers','Miami Marlins','Milwaukee Braves','Milwaukee Brewers','Minnesota Twins',
      'Montreal Expos','New York Giants','New York Mets','New York Yankees',
      'Oakland Athletics','Philadelphia Athletics','Philadelphia Phillies',
      'Pittsburgh Pirates','San Diego Padres','San Francisco Giants',
      'Seattle Mariners','Seattle Pilots','St. Louis Browns','St. Louis Cardinals',
      'Tampa Bay Devil Rays','Tampa Bay Rays','Texas Rangers','Toronto Blue Jays',
      'Washington Nationals','Washington Senators',     
  ])
    .range([   
      '#C4CED4','#E3D4AD','#CE1141','#DF4601','#FFB101','#EAAA00','#BD3039','#00008b','#FFFFFF',
      '#CC3433','#C4CED4','#BA0021','#C6011F','#E31937','#33006F','#FA4616','#00A3E0','#EB6E1F',
      '#FF6600','#EFB21E','#004687','#862633','#005A9C','#00A3E0','#CE1141','#B6922E','#002B5C',
      '#003087','#A71930','#FF5910','#003087','#EFB21E','#002D72','#E81828','#FDB827','#FFC425',
      '#FD5A1E','#C4CED4','#1E1656','#654321','#BA0C2F','#8FBCE6','#8FBCE6','#003278','#134A8E',
      '#AB0003','#00008b',
    ]);

  // 
  const formatter = xScale.tickFormat()
  
  return (
    <g transform={`translate(${x}, ${y})`}>
      {data.sort((a, b) => b.rank - a.rank ).map((d, index) => (
        <Bar
          data={d}
          key={d.team}
          y={yScale(index)}
          width={xScale(d.onBase)}
          formatter={formatter}
          thickness={yScale.bandwidth()}
          color={color(d.team) || 'white'}
        />
      ))}
    </g>
  );
};

export default Barchart;
