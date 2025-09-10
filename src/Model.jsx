import React, { useEffect, useState } from 'react'
import { ScatterChart, Scatter,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


function Model() {

  const [historyData, setHistoryData] = useState([]);
  const [trainData, setTrainData] = useState()


  useEffect(()=>{
      async function loadTf(){
        console.log("Loading TensorFlow.js");

        const model = tf.sequential();
        model.add(tf.layers.dense({units: 1, inputShape: [1]}));
        model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
    
        // raw arrays
        const xsArr = [-1, 0, 1, 2, 3, 4];
        const ysArr = [-3, -1, 1, 3, 5, 7];

        // tensors for training
        const xs = tf.tensor2d(xsArr, [6, 1]);
        const ys = tf.tensor2d(ysArr, [6, 1]);
        const history = await model.fit(xs, ys, {epochs: 250});
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
        }))
        setTrainData(formatted_train)
      }
      loadTf()      

    },[])


    return (
      <>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Training Loss</h2>
        <LineChart width={500} height={300} data={historyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="epoch" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="loss" stroke="#0d00ffff" dot={false} />
        </LineChart>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Training data</h2>
        <ScatterChart width={500} height={300} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Scatter name="Training Data" data={trainData} fill="#0d00ffff" />
        </ScatterChart>
    </div>
      
      </>
    )

}

export default Model
