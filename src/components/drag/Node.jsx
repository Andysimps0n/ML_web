import { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls, applyEdgeChanges, addEdge, applyNodeChanges, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';


const initialNodes = [
  {
    id : 'n1',
    data: { label: 'Node 1' },
    position : { x : 0, y : 0 },
    type : 'default',
  },
  {
    id : 'n2',
    data: { label: 'Node 2' },
    position : { x : 100, y : 100 },
    type : 'default',

  },
]


const initialEdges = [
  // {
  //   id : 'n1-n2',
  //   source : 'n1',
  //   target : 'n2',
  //   type: 'step',
  //   label: 'connects with',
  // }
]
function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  
  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  )
  
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  )

  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot))
  )

  return (
    <div style={{ height: '100vh', width: '100vw'}}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
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
