import React from 'react'
import { useState } from 'react';
function HyperparameterCard({ isLoaded, updateLine, setInputPredict, inputPredict}) {
    const [lossfunction, setLossFunction] = useState('meanSquaredError');
  
  
  return (
    <div className={`input-card ${isLoaded ? "" : "hide-block"}` }>


      <div className="card-container hyperparameter-card height40vh">
        <div className="hyperparameter-wrapper">
          <div className="parameter-name">Loss functions</div>
          <div className="button-container">
            <div className={`buttons-wrapper`}>
              <div className="parameter-options">Mean Squared Error</div>
              <div className="parameter-options">Absolute Difference</div>
              <div className="parameter-options">Absolute Difference</div>
            </div>
          </div>
        </div> 
        <div className="hyperparameter-wrapper">
          <div className="parameter-name">Loss functions</div>
          <div className="button-container">
            <div className={`buttons-wrapper`}>
              <div className="parameter-options">Mean Squared Error</div>
              <div className="parameter-options">Absolute Difference</div>
              <div className="parameter-options">Absolute Difference</div>
            </div>
          </div>
        </div> 
        <div className="hyperparameter-wrapper">
          <div className="parameter-name">Loss functions</div>
          <div className="button-container">
            <div className={`buttons-wrapper`}>
              <div className="parameter-options">Mean Squared Error</div>
              <div className="parameter-options">Absolute Difference</div>
              <div className="parameter-options">Absolute Difference</div>
            </div>
          </div>
        </div> 
        <div className="hyperparameter-wrapper">
          <div className="parameter-name">Loss functions</div>
          <div className="button-container">
            <div className={`buttons-wrapper`}>
              <div className="parameter-options">Mean Squared Error</div>
              <div className="parameter-options">Absolute Difference</div>
              <div className="parameter-options">Absolute Difference</div>
            </div>
          </div>
        </div> 
      </div>


      <div className="card-container center">
        <div className="card-wrapper">
          <div className="text-container">How much do you squat? <br></br>(use standard unit -  Kg)</div>
          <input
          value={inputPredict}          // <-- controlled
          onKeyDown={(e) => {if (e.key === "Enter") {updateLine(inputPredict); setInputPredict('');  }}}
          onChange={(e)=>{setInputPredict(e.target.value)}} type="text"
          />
          <button onClick={()=>{updateLine(inputPredict);setInputPredict('');}}>Predict</button>
        </div>
      </div> 
    </div>
  )
}

export default HyperparameterCard
