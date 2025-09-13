import React, { useEffect, useState, useRef, use } from 'react'
import { ScatterChart, Scatter,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { UseLinearModel } from './functions/functions';

function Model() {
  const { historyData, setHistoryData, trainData, setTrainData, predLine, setPredLine, lineData, setLineData, inputPredict, setInputPredict, testingData, setTestingData, modelState, setModelState, updateLine} = UseLinearModel();
  


    return (
      <>
        <div className="plot-wrapper">
          
            <div className="p-4 flex-1">
              <h2 className="text-lg font-bold mb-2">Training Loss</h2>
              <LineChart width={500} height={300} data={historyData}>
                <CartesianGrid />
                <XAxis dataKey="epochs" />
                <YAxis dataKey="loss" />
                <Tooltip />
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
                <Scatter r={6} name="Training Data" data={trainData} fill="#554cffff" />
                <Scatter r={6} name="Prediction" data={testingData} fill="#3cb36aff" />
                {/* <Line type="monotone" data={predLine} dataKey="y" stroke="#0000ff" dot={false} name="Model Prediction" /> */}
              </ScatterChart>
            </div>
        </div>

        <div className="card-container">
          <input 
          value={inputPredict}          // <-- controlled
          onKeyDown={(e) => {if (e.key === "Enter") {updateLine(inputPredict); setInputPredict('');  }}} 
          onChange={(e)=>{setInputPredict(e.target.value)}} type="text" 
          />
          <button onClick={()=>{updateLine(inputPredict);setInputPredict('');}}>Predict</button>

        </div>
      </>
    );


}

export default Model
