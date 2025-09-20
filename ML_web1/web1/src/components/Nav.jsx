import React from 'react'
import { Link } from 'react-router-dom'
function Nav() {
  return (
    <div className="nav-container">
      <Link to="/" className="nav-item">Home</Link>
      <Link to="/neuralnetwork" className="nav-item">Neural Network</Link>
    </div>
  )
}

export default Nav
