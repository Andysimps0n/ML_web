import { useState } from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function Flow() {

  return (
    <div style={{ height: '100vh', width: '100vw'}}>
        <ReactFlow>
          <Background/>
          <Controls/>
        </ReactFlow>
    </div>
  );
}

export default Flow;
