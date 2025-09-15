import React, { useEffect, useState, useRef } from 'react'
import { useLoadData } from './useLoadData';

function UseLinearModel(lossfunction) {
    const [historyData, setHistoryData] = useState([]);
    const [testingData, setTestingData] = useState([]);
    const [trainData, setTrainData] = useState([])
    const [predLine, setPredLine] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [inputPredict, setInputPredict] = useState('');
    const [modelState, setModelState] = useState(null);
    const [result, setResult] = useState(null);
    const data = useLoadData();
    
    useEffect(()=>{
        if(data == null) return;
        // console.log(data)
    },[data])
    
    useEffect(()=>{
        if(data == null) return;

        data.pop()
        async function loadTf(lossfunction="meanSquaredError"){
            const model = tf.sequential();
            model.add(tf.layers.dense({units: 1, inputShape: [1]}));
            model.compile({loss: lossfunction, optimizer: 'sgd'});
            setModelState(model)
            
            // raw arrays
            const xsArr = data.map(d => Number(d.BestSquatKg) / 100);
            const ysArr = data.map(d => Number(d.BestDeadliftKg) / 100);

            // console.log(xsArr, ysArr);
            
            // tensors for training
            const xs = tf.tensor2d(xsArr, [xsArr.length, 1]);
            const ys = tf.tensor2d(ysArr, [ysArr.length, 1]);
            const history = await model.fit(xs, ys, {epochs: 50});
            
            console.log("Model trained");
            // console.log(xs, ys);
            
            // History data for loss chart
            const formatted_history = history.history.loss.map((loss, i)=> ({
            epochs : i + 1,
            loss,
            }))
            setHistoryData(formatted_history)
            // console.log(formatted_history)
    
            // Training data for scatter chart
            const formatted_train = xsArr.map((x, i)=> ({
            x : x * 100,
            y : ysArr[i] * 100,
            }))
            setTrainData(formatted_train)
            setPredLine(formatted_history)
            
            


        }
        loadTf(lossfunction);
    },[data])



    async function updateLine(input){
        const value = Number(input) / 100;
        const inputTensor = tf.tensor2d([value], [1, 1]);
        const predTensor = await modelState.predict(inputTensor);
        const predValue = (await predTensor.data())[0] * 100;
    
        setTestingData(pred=>[...pred, {x: Number(value) * 100, y: predValue}])
    
        console.log(`For input ${value}, model predicts ${predValue}`);
        setResult(predValue);
    }



    return { historyData, result,updateLine, trainData, setHistoryData, setTrainData, predLine, setPredLine, lineData, setLineData, inputPredict, setInputPredict, testingData, setTestingData, modelState, setModelState};}
    
export { UseLinearModel };

    