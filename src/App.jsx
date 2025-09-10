import { useEffect, useState } from 'react'
import './App.css'
import return_model from '../return_model'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



function App() {

  const [model, setModel] = useState(null);
  const [historyData, setHistoryData] = useState([])
  useEffect(()=>{
    const saveModel = async ()=>{
      const [loadedModel, loadedHistoryData] = await return_model()
      setModel(loadedModel)
      setHistoryData(loadedHistoryData)
    }
    saveModel()
  },[])

   async function returnPrediction(input){
      const inputTensor = tf.tensor2d([input], [1,1])
      const prediction = model.predict(inputTensor)
      const value = (await prediction.data())[0]
      
      return value
  }

    useEffect(() => {
      const runPrediction = async () => {
        if (model) {
          const result = await returnPrediction(-1)
          console.log(result)
        }
      }
      runPrediction()
    }, [model])  

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
        <Line type="monotone" dataKey="loss" stroke="#8884d8" dot={false} />
      </LineChart>
    </div>
    </>
  )
}

export default App
