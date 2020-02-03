import React from 'react';
import * as d3 from 'd3';

const Bar = ({ data }) => {
    return ( <rect x={0} y={0} width={100} height={10} fill="white" />)
}
//draws for single year
const Barchart = ({ data, x, y }) => {

    return (
    <g transform={`translate(${x}, ${y})`}>
        {data.map(d => (
            <Bar data={d} key={d.name} />
            ))}
    </g>
    );
}

export default Barchart;