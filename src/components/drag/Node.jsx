import { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function Flow() {

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  )

  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot))
  )

  const initialNodes = [
    {
      id : 'n1',
      position : { x : 0, y : 0 },
      data: { label: 'Node 1' },
      type : 'input',
    },
    {
      id : 'n2',
      position : { x : 100, y : 100 },
      data: { label: 'Node 2' },
      type : 'input',
    },
  ]
  
  
  const initialEdges = [
    {
      id : "n1-n2",
      source : 'n1',
      target : 'n2'
    }
  ]
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  
  return (
    <div style={{ height: '100vh', width: '100vw'}}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background/>
          <Controls/>
        </ReactFlow>
    </div>
  );
}

export default Flow;
