import React, { useEffect } from 'react'
import { ScatterChart, Scatter,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Charts({ historyData, isLoaded, trainData, testingData }) {

  

  return (
    <div className={`plot-wrapper ${isLoaded ? "" : "hide-block"}`}>
        <div className="p-4 flex-1">
          <h2 className="text-lg font-bold mb-2">Training Loss</h2>
          <LineChart width={500} height={300} data={historyData}>
            <CartesianGrid />
            <XAxis dataKey="epochs" />
            <YAxis dataKey="loss" />
            <Tooltip  formatter={(value, name) => [value.toFixed(3), name]} />
            <Legend />
            <Line type="monotone" dataKey="loss" stroke="#0d00ffff" dot={false} />
          </LineChart>
        </div>

        <div className="p-4 flex-1">
          <h2 className="text-lg font-bold mb-2">Training Data</h2>
          <ScatterChart width={500} height={300}>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" />
            <YAxis type="number" dataKey="y" />
            <Tooltip />
            <Legend />
            <Scatter r={0.1} name="Training Data" data={trainData} fill="#01b661ff" />
            <Scatter r={10} name="Prediction" data={testingData} fill="#ff0000ff" />
            {/* <Line type="monotone" data={predLine} dataKey="y" stroke="#0000ff" dot={false} name="Model Prediction" /> */}
          </ScatterChart>
        </div>
    </div>
  )
}

export default Charts
