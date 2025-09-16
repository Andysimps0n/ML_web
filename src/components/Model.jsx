import React, { useEffect, useState } from 'react'
import { UseLinearModel } from '../functions/functions';
import Charts from './Charts';
import HyperparameterCard from './HyperparameterCard';

function Model() {
  const [dataSize, setDataSize] = useState(200);
  const [epoch, setEpoch] = useState(50);

  const { 
    historyData, 
    trainData, 
    inputPredict, 
    setInputPredict, 
    testingData, 
    updateLine
  } = UseLinearModel(dataSize, epoch);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (historyData.length > 0) {
      setIsLoaded(true);
    }
  }, [historyData]);

  return (
    <>
      <div className={`loading ${isLoaded ? "hide-block" : ""}`}>
        Loading Model...
      </div>

      <Charts 
        historyData={historyData} 
        isLoaded={isLoaded} 
        trainData={trainData} 
        testingData={testingData} 
      />

      <HyperparameterCard 
        setEpoch={setEpoch}
        setDataSize={setDataSize}
        isLoaded={isLoaded}
        updateLine={updateLine}
        setInputPredict={setInputPredict}
        inputPredict={inputPredict}
      />
    </>
  );
}

export default Model;
