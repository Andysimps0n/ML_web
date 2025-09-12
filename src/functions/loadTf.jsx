async function loadTf(){
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

  export default loadTf;