import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';



function TextUpdaterNode({ data, isConnectable }) {
  const [att, setatt] = useState([1])
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <p>{data.value}</p>
        {
          att.map((e) => {
            return (<>
              <label htmlFor="text">Attribute-{e}:</label>
              <input id="text" name="text" onChange={onChange} className="nodrag" />
            </>)
          })
        }
        <button onClick={() => setatt([...att,att[att.length-1]+1])} style={{ display: 'block', margin: '5px auto auto auto' }}>Add</button>
        
      </div>

      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable}/>
    </div>
  );
}

export default TextUpdaterNode;
