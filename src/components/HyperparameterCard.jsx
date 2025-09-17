import React from 'react'
import { useState } from 'react';
function HyperparameterCard({ 
  isLoaded, 
  updateLine,
  setInputPredict, 
  setDataSize, 
  inputPredict,
  setEpoch,
  setLossFunction,
  lossMap,

}) {
  
  const lossFunctionOptions = ['meanSquaredError', 'absoluteDifference'];
  const dataSizeOptions = [100, 200, 500, 1000, 3000];
  const epochOptions = [10, 50, 100];


  return (
    <div className={`input-card ${isLoaded ? "" : "hide-block"}` }>


      <div className="card-container hyperparameter-card height40vh">
        <div className="hyperparameter-wrapper">
          <div className="parameter-name">Loss Functions</div>
          <div className="button-container">
            <div className={`buttons-wrapper`}>
              <div onClick={()=>{setLossFunction(lossMap.mse)}} className="parameter-options">Mean Squared Error</div>
              <div onClick={()=>{setLossFunction(lossMap.mae)}} className="parameter-options">Mean Absolute Error</div>
            </div>
          </div>
        </div> 


        {/* <div className="hyperparameter-wrapper">
          <div className="parameter-name">Optimizer Funcitons</div>
          <div className="button-container">
            <div className={`buttons-wrapper`}>
              <div className="parameter-options">Adaptive Gradient Algorithm</div>
              <div className="parameter-options">Adaptive Moment Estimation</div>
              <div className="parameter-options">Stochastic Gradient Descent</div>
            </div>
          </div>
        </div>  */}


        <div className="hyperparameter-wrapper">
          <div className="parameter-name">Data Size</div>
          <div className="button-container">
            <div className={`buttons-wrapper`}>
              {dataSizeOptions.map((size,i)=>(
                <div key={i} className="parameter-options" onClick={()=>{setDataSize(size)}}>{size}</div>
              ))}
            </div>
          </div>
        </div> 



        <div className="hyperparameter-wrapper">
          <div className="parameter-name">Epoch</div>
          <div className="button-container">
            <div className={`buttons-wrapper`}>
              {epochOptions.map((size, i)=>(
                <div key={i} className="parameter-options" onClick={()=>{setEpoch(size)}}>{size}</div>
              ))}
            </div>
          </div>
        </div> 
      </div>





      <div className="wrapper2">
        <div className="card-container center model-input-card">
          <div className="card-wrapper">
            <div className="text-container ">How much do you squat? <br></br>(use standard unit -  Kg)</div>
            <input
            value={inputPredict}          // <-- controlled
            onKeyDown={(e) => {if (e.key === "Enter") {updateLine(inputPredict); setInputPredict('');  }}}
            onChange={(e)=>{setInputPredict(e.target.value)}} type="text"
            />
            <button onClick={()=>{updateLine(inputPredict);setInputPredict('');}}>Predict</button>
          </div>
        </div> 
        {/* <div className="card-container run-model-button" onClick={() => window.location.reload()}>Run</div> */}

      </div>
    </div>
  )
}

export default HyperparameterCard
