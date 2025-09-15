import { useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'  
import Nav from './components/Nav'
import Model from './components/Model'


function App() {


return (
  <Router>
    <Nav></Nav>
    <Routes>
      <Route path='/' element={<Model></Model>}></Route>
      {/* <Route path='/human-learning' element={<div></div>}></Route> */}
    </Routes>

  </Router>

  )
}

export default App
