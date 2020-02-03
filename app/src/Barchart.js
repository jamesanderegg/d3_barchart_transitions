import React from 'react';
import * as d3 from 'd3';

const Bar = ({ data, y }) => {
    return ( <rect x={0} y={y} width={100} height={10} fill="white" />)
}
//draws for single year
const Barchart = ({ data, x, y, height }) => {
    
    //create scale for vertical alignment
    const yScale = d3.scaleBand()
        .domain(data.map(d=> d.name))
        .range([height,0]);

    return (
    <g transform={`translate(${x}, ${y})`}>
        {data.map(d => (
            <Bar data={d} key={d.name} y={yScale(d.name)} />
            ))}
    </g>
    );
}

export default Barchart;