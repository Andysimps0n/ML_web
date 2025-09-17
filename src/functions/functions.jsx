import React, { useEffect, useState, useRef } from 'react'
import { useLoadData } from './useLoadData';

function UseLinearModel(dataSize=200, epoch=50) {
    const [historyData, setHistoryData] = useState([]);
    const [testingData, setTestingData] = useState([]);
    const [trainData, setTrainData] = useState([])
    const [predLine, setPredLine] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [inputPredict, setInputPredict] = useState('');
    const [modelState, setModelState] = useState(null);
    const [result, setResult] = useState(null);
    
    const data = useLoadData(dataSize);
    const epoch_ = epoch

    
    useEffect(()=>{
        if(data == null) return;

        async function loadTf(epoch){
            const model = tf.sequential();
            model.add(tf.layers.dense({units: 1, inputShape: [1]}));
            model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
            setModelState(model)
            
            // raw arrays
            const xsArr = data.map(d => Number(d.BestSquatKg) / 100);
            const ysArr = data.map(d => Number(d.BestDeadliftKg) / 100);
            xsArr.pop();
            ysArr.pop();
            
            // tensors for training
            const xs = tf.tensor2d(xsArr, [xsArr.length, 1]);
            const ys = tf.tensor2d(ysArr, [ysArr.length, 1]);
            const history = await model.fit(xs, ys, {epochs: epoch});

            

            // History data for loss chart
            const formatted_history = history.history.loss.map((loss, i)=> ({
                loss,
                epochs : i + 1,
            }))
            setHistoryData(formatted_history)

            
            // Training data for scatter chart
            const formatted_train = xsArr.map((x, i)=> ({
            x : x * 100,
            y : ysArr[i] * 100,
            }))
            setTrainData(formatted_train)
            
            


        }
        loadTf(epoch_);
    },[data, epoch_, dataSize])



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

    