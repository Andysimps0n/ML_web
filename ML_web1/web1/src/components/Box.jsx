import React, {useState, useEffect, useRef } from 'react'
import '../NeuralNetwork.css'

function Box() {

  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  
  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };


 return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ height: "100dvh", width: "100dvw" }}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          width: "100px",
          height: "100px",
          backgroundColor: "skyblue",
          cursor: "grab",
          userSelect: "none",
        }}
      >
        Drag me
      </div>
    </div>
  );  
}

export default Box
