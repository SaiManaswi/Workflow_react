import { useCallback, useState, useRef } from 'react';
import ReactFlow, { applyEdgeChanges, applyNodeChanges, Background, MarkerType, updateEdge } from 'reactflow';
import 'reactflow/dist/style.css';

import TextUpdaterNode from './CustomNode.js';

import './overview.css'

const rfStyle = {
  backgroundColor: 'white',
};
var intialnodes = []
var intialedges = []
var nodeselect = undefined
if (sessionStorage.getItem('Nodes'))
  intialnodes = JSON.parse(sessionStorage.getItem('Nodes'))
if (sessionStorage.getItem('Edges'))
  intialedges = JSON.parse(sessionStorage.getItem('Edges'))

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow(props) {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes] = useState(intialnodes);
  const [edges, setEdges] = useState(intialedges);


  const onPaneClick = useCallback((event) => {
    console.log('pane clicked')
    if (nodeselect)
      nodeselect.data.focus = false
    nodeselect = undefined
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onNodeClick = useCallback((event, node) => {
    if (nodeselect)
      nodeselect.data.focus = false
    nodeselect = node
    nodeselect.data.focus = true
    onNodesChange(nodes)
    console.log(nodeselect)
  }, [onNodesChange, nodes])

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => {
      setEdges([...edges, {
        id: `e${connection.source}-${connection.target}`, source: `${connection.source}`, target: `${connection.target}`, markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: 'black',
        },
        style: {
          strokeWidth: 1,
          stroke: 'green',
        },
        animated: true
      }])
    }, [edges]
  );

  return (
    <div style={{ width: '50vw', height: '100vh', display: 'flex', flexDirection:'column'}}>
      <div className='buttons' >
        <button onClick={() => {
          setNodes([...nodes, { id: `node-${nodes.length + 1}`, type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: `Stage-${nodes.length + 1}`, att: [1], focus: false } }])
        }}>Add Node</button>
        <button onClick={() => {
          console.dir(nodes)
          console.dir(edges)
          sessionStorage.setItem('Nodes', JSON.stringify(nodes))
          sessionStorage.setItem('Edges', JSON.stringify(edges))

        }}>Save</button>
        <button onClick={() => {
          if (nodeselect)
            nodeselect.data.att = [...nodeselect.data.att, nodeselect.data.att.length + 1]
          else
            console.log('else')
          setNodes(nodes.map(e => {
            return { id: e.id, type: e.type, position: e.position, data: { value: e.data.value, att: [...e.data.att] } }
          }))
        }}>Add Attribute</button>
        <button onClick={() => {
          if (nodeselect) {
            setNodes(nodes.filter(e => { return e.id !== nodeselect.id }))
            setEdges(edges.filter(e => { return e.target !== nodeselect.id && e.source !== nodeselect.id }))
          }
        }}>Delete Node</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        style={rfStyle}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
      >
        <Background color="#aaa" gap={16} />
      </ReactFlow>

      {/* <Property-Panel /> */}

    </div>
  );
}

export default Flow;