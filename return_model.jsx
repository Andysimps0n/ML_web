import React, { useEffect } from 'react'


function return_model() {

  const [historyData, setHistoryData] = React.useState([]);
    useEffect( async()=>{

      
      // Model creation
      const model = tf.sequential();
      model.add(tf.layers.dense({units: 1, inputShape: [1]}));
      model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
  
  
      const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
      const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);
  
      const history = await model.fit(xs, ys, {epochs: 250});
      const formatted_history = history.history.loss.map((loss, i)=> ({
        epochs : i + 1,
        loss,
      }))

      setHistoryData(formatted_history)
    })



  return [model, historyData]
}

export default return_model
