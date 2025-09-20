import React, { useEffect, useState } from 'react'
import { UseLinearModel } from '../functions/functions';
import Charts from './Charts';
import HyperparameterCard from './HyperparameterCard';

function Model() {

  const lossMap = {
    mse: 'meanSquaredError',
    mae: tf.metrics.meanAbsoluteError,
  };

  const [dataSize, setDataSize] = useState(200);
  const [epoch, setEpoch] = useState(50);
  const [lossFunction, setLossFunction] = useState(lossMap.mse);

  const { 
    historyData, 
    trainData, 
    inputPredict, 
    setInputPredict, 
    testingData, 
    updateLine
  } = UseLinearModel(dataSize, epoch, lossFunction);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (historyData.length > 0) {
      setIsLoaded(true);
    }
  }, [historyData]);

  useEffect(()=>{
    console.log(`lossFunction set to ${lossFunction}`);
  }, [lossFunction])


  useEffect(()=>{
    console.log(`lossFunction set to ${lossFunction}`);
  }, [lossFunction])

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
        lossMap={lossMap}
        setEpoch={setEpoch}
        setLossFunction={setLossFunction}
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
