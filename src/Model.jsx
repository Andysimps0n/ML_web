import React, { useEffect, useState } from 'react'
import { ScatterChart, Scatter,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


function Model() {

  const [historyData, setHistoryData] = useState([]);
  const [trainData, setTrainData] = useState([])
  const [predLine, setPredLine] = useState([]);
  const [lineData, setLineData] = useState([-1, 0, 1, 2, 3, 4]);
  const [inputPredict, setInputPredict] = useState(0);
  const [modelState, setModelState] = useState(null);

  async function updateLine(input){
    // value pair
    // adding the pair
    const value = Number(input);
    
    const inputTensor = tf.tensor2d([value], [1, 1]);
    const predTensor = modelState.predict(inputTensor);
    const predValue = (await predTensor.data)[0];
    // setTrainData(pred=>[...pred, {x: Number(value), y: predValue}])
    
    console.log(`For input ${value}, model predicts ${predValue}`);
    console.log(predTensor)
  }

  
  useEffect(()=>{
    async function loadTf(input){
      console.log("Loading TensorFlow.js");
      
        const model = tf.sequential();
        model.add(tf.layers.dense({units: 1, inputShape: [1]}));
        model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
        setModelState(model)
       
        // raw arrays
        const xsArr = [-1, 0, 1, 2, 3, 4];
        const ysArr = [-3, -1, 1, 3, 5, 7];

        // tensors for training
        const xs = tf.tensor2d(xsArr, [6, 1]);
        const ys = tf.tensor2d(ysArr, [6, 1]);
        const history = await model.fit(xs, ys, {epochs: 100});
        console.log("Model trained");

        // History data for loss chart
        const formatted_history = history.history.loss.map((loss, i)=> ({
          epochs : i + 1,
          loss,
        }))
        setHistoryData(formatted_history)
  

        // Training data for scatter chart
        const formatted_train = xsArr.map((x, i)=> ({
          x,
          y : ysArr[i],
          z : 1
        }))
        setTrainData(formatted_train)

        // prediction line (more points for smooth line)
        const preds = model.predict(tf.tensor2d(lineData, [lineData.length, 1]));
        const predsArr = Array.from(await preds.data());

        const formatted_line = lineData.map((x, i) => ({
          x,
          y: predsArr[i],
        }));
        setPredLine(formatted_line);

      }
      loadTf()      
    },[])


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
                <XAxis dataKey="x" />
                <YAxis dataKey="y" />
                <Tooltip />
                <Legend />
                <Scatter r={6} name="Training Data" data={trainData} fill="#0d00ffff" />
                <Line type="monotone" data={predLine} dataKey="y" stroke="#0000ff" dot={false} name="Model Prediction" />
              </ScatterChart>
            </div>
        </div>

        <div className="card-container">
          <input onChange={(e)=>{setInputPredict(e.target.value)}} type="text" />
          {/* <button onClick={()=>{predictValue(inputPredict)}}>Predict</button> */}
          <button onClick={()=>{updateLine(inputPredict)}}>Predict</button>

        </div>
      </>
    );


}

export default Model
