import React, { useEffect, useState, useRef } from 'react'
import { ScatterChart, Scatter,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


function Model() {

  const [historyData, setHistoryData] = useState([]);
  const [testingData, setTestingData] = useState([]);
  const [trainData, setTrainData] = useState([])
  const [predLine, setPredLine] = useState([]);
  const [lineData, setLineData] = useState([1, 2, 3, 4, 5, 6]);
  const [inputPredict, setInputPredict] = useState('');
  const [modelState, setModelState] = useState(null);
  const inputRef = useRef(null);

  async function updateLine(input){
    const value = Number(input);
    const inputTensor = tf.tensor2d([value], [1, 1]);
    const predTensor = await modelState.predict(inputTensor);
    const predValue = (await predTensor.data())[0];

    setTestingData(pred=>[...pred, {x: Number(value), y: predValue}])
    setPredLine(pred=>[...pred, {x: value, y: predValue}])

    console.log(`For input ${value}, model predicts ${predValue}`);
  }

  useEffect(() => {
    console.log("Line data updated:", lineData);
  }, [lineData]);
  
  useEffect(()=>{
    async function loadTf(input){
      console.log("Loading TensorFlow.js");
      
        const model = tf.sequential();
        model.add(tf.layers.dense({units: 1, inputShape: [1]}));
        model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
        setModelState(model)
       
        // raw arrays
        const xsArr = [1, 2, 3, 4, 5, 6];
        const ysArr = [2, 4, 6, 8, 10, 12];

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
      setPredLine(formatted_history)

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
