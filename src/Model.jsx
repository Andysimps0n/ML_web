import React, { useEffect, useState, useRef, use } from 'react'
import { ScatterChart, Scatter,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { UseLinearModel } from './functions/functions';

function Model() {
  const { historyData, trainData, inputPredict, setInputPredict, setTrainData, result, predLine, testingData, updateLine} = UseLinearModel();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if(historyData.length > 0) {
      setIsLoaded(true);
    }
  }, [historyData]);


  useEffect(()=>{
    if(testingData.length > 0){

      window.alert(" You would deadlift" + result.toFixed(1) + " Kg" );
    }
  },[testingData])

    return (
      <>
        {isLoaded ?
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
                <Scatter r={0.1} name="Training Data" data={trainData} fill="#01b661ff" />
                <Scatter r={10} name="Prediction" data={testingData} fill="#ff0000ff" />
                {/* <Line type="monotone" data={predLine} dataKey="y" stroke="#0000ff" dot={false} name="Model Prediction" /> */}
              </ScatterChart>
            </div>
        </div>
        : <div className='loading'>Loading Model...</div>}
        {isLoaded ?
        <div className="card-container">
          <div className="card-wrapper">
            <div className="text-container">How much do you squat? <br></br>(use standard unit -  Kg)</div>
            <input 
            value={inputPredict}          // <-- controlled
            onKeyDown={(e) => {if (e.key === "Enter") {updateLine(inputPredict); setInputPredict('');  }}} 
            onChange={(e)=>{setInputPredict(e.target.value)}} type="text" 
            />
            <button onClick={()=>{updateLine(inputPredict);setInputPredict('');}}>Predict</button>
          </div>
        </div> : <div></div>}
      </>
    );


}

export default Model
