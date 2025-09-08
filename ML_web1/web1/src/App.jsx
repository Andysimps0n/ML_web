import { useEffect, useState } from 'react'
import './App.css'
import return_model from '../return_model'

function App() {

  const [model, setModel] = useState(null);
  useEffect(()=>{
    const saveModel = async ()=>{
      const loadedModel = await return_model()
      setModel(loadedModel)
    }
    saveModel()
  },[])

  // useEffect(()=>{
  //   console.log(model)
  // },[model])

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
    </>
  )
}

export default App
