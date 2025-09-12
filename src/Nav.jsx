import React from 'react'
import { Link } from 'react-router-dom'
function Nav() {
  return (
    <div className="nav-container">
      <Link to="/" className="nav-item">Home</Link>
      <Link to="rock-paper-scissor" className="nav-item">Game 1</Link>
    </div>
  )
}

export default Nav
