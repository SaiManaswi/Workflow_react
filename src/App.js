import { useCallback, useState, useRef } from 'react';
import ReactFlow, { applyEdgeChanges, applyNodeChanges, Background, MarkerType, updateEdge, Controls, MiniMap, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { MenuItem, Select, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
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

function Flow() {
  const { workflowName } = useParams();
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes] = useState(intialnodes);
  const [edges, setEdges] = useState(intialedges);
  const [variant, setVariant] = useState('dots');

  const handleChange = (event) => {
    setVariant(event.target.value);
  };
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
    <div style={{ width: '100vw', height: '96vh', display: 'flex', flexDirection: 'row' }}>
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
        fitView
      >
        <Controls />
        <MiniMap />
        <Panel position="top-left">
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={() => {
            sessionStorage.setItem('Nodes', JSON.stringify(nodes))
            sessionStorage.setItem('Edges', JSON.stringify(edges))
            alert('Saved Successfully')
          }}>Save</Button>
        </Panel>
        <Background color="#aaa" gap={16} variant={variant} />
      </ReactFlow>

      {/* <Property-Panel /> */}
      <div className='property-panel' >
        <h4> Name of the workflow : {workflowName} </h4>
        <Divider />
        <div id='Add-nodes'>
          <h4> Create New Node : </h4>
          <input type='text' id='nodename' placeholder='Enter node name'></input>
          <button onClick={() => {
            var nodename = document.getElementById('nodename').value;
            if (nodename !== '') {
              setNodes([...nodes, { id: `${document.getElementById('nodename').value}`, type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: `${document.getElementById('nodename').value}`, att: [1], focus: false } }])
              document.getElementById('nodename').value = '';
            } else alert("Enter the name of the Node")

          }}>Add Node</button>
        </div>
        <Divider />
        <Button variant="filledTonal" startIcon={<DeleteIcon />} onClick={() => {
          if (nodeselect) {
            setNodes(nodes.filter(e => { return e.id !== nodeselect.id }))
            setEdges(edges.filter(e => { return e.target !== nodeselect.id && e.source !== nodeselect.id }))
          }
          else
            alert('Select a node to delete')
        }}>  Delete </Button>
        <Divider />
        <div id='add-attributes'>
          <button onClick={() => {
            if (nodeselect) {
              document.getElementById('attributes-list').style.display = 'block';
              var name = document.getElementById('attrName').value;
              var value = document.getElementById('attrValue').value;
              if (name !=='' && value != '') {
                name = document.getElementById('attrName').value;
                value = document.getElementById('attrValue').value;
                nodeselect.data.att[nodeselect.data.att.length] = [name, value];
                // nodeselect.data.att = [...nodeselect.data.att, nodeselect.data.att.length + 1]
                document.getElementById('attrName').value = '';
                document.getElementById('attrValue').value = '';
              } else alert("Enter the values to add attributes")
            }
            else
              alert('Select a node to add attributes.')
            setNodes(nodes.map(e => {
              return { id: e.id, type: e.type, position: e.position, data: { value: e.data.value, att: [...e.data.att] } }
            }))
          }}>Add Attribute</button>
          <div id='attributes-list'>
            <label id='node-att' htmlFor="text">Attribute-</label><br></br>
            <input id='attrName' type='text' placeholder='Name of the attribute'></input>
            <input id='attrValue' type='text' placeholder='Value of the attribute'></input>
          </div>
        </div>
        <Divider />
        <div id='varients'>
          <h4>Select the varients of the graph</h4>
          <Select
            id="demo-simple-select-helper"
            value={variant}
            onChange={handleChange}
          >
            <MenuItem value={'dots'}>Dots</MenuItem>
            <MenuItem value={'cross'}>Cross</MenuItem>
            <MenuItem value={'lines'}>Lines</MenuItem>
          </Select>
        </div>
        <Divider />
      </div>
    </div>
  );
}

export default Flow;