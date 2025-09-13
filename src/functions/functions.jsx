import React, { useEffect, useState, useRef } from 'react'
import { useLoadData } from './useLoadData';

function UseLinearModel() {
    const [historyData, setHistoryData] = useState([]);
    const [testingData, setTestingData] = useState([]);
    const [trainData, setTrainData] = useState([])
    const [predLine, setPredLine] = useState([]);
    const [lineData, setLineData] = useState([1, 2, 3, 4, 5, 6]);
    const [inputPredict, setInputPredict] = useState('');
    const [modelState, setModelState] = useState(null);
    const data = useLoadData();
    
    useEffect(()=>{
        if(data == null) return;
            
        console.log(data)
        
    },[data])
    
    useEffect(()=>{
        if(data == null) return;
        async function loadTf(){
            
            
            const model = tf.sequential();
            model.add(tf.layers.dense({units: 1, inputShape: [1]}));
            model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
            setModelState(model)
            
            // raw arrays
            const xsArr = data.map(d => parseFloat(d.BestSquatKg));  // x-axis values
            const ysArr= data.map(d => parseFloat(d.BestBenchKg));  // y-axis values

            
            // tensors for training
            const xs = tf.tensor2d(xsArr, [xsArr.length, 1]);
            const ys = tf.tensor2d(ysArr, [xsArr.length, 1]);
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
        loadTf();
    },[data])



    async function updateLine(input){
        const value = Number(input);
        const inputTensor = tf.tensor2d([value], [1, 1]);
        const predTensor = await modelState.predict(inputTensor);
        const predValue = (await predTensor.data())[0];
    
        setTestingData(pred=>[...pred, {x: Number(value), y: predValue}])
        setPredLine(pred=>[...pred, {x: value, y: predValue}])
    
        console.log(`For input ${value}, model predicts ${predValue}`);
    }



    return { historyData, updateLine, trainData, setHistoryData, setTrainData, predLine, setPredLine, lineData, setLineData, inputPredict, setInputPredict, testingData, setTestingData, modelState, setModelState};}
    
export { UseLinearModel };

    