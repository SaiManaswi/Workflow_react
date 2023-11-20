import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';



function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node" style={{border:`${data.focus? 2:1}px solid ${data.focus? 'pink':'black'}`}}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <p>{data.value}</p>
        {
          data.att.map((e) => {
            return (<>
              <label htmlFor="text">Attribute-{e}:</label>
              <input id="text" name="text" onChange={onChange} className="nodrag" />
            </>)
          })
        }
        
      </div>

      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable}/>
    </div>
  );
}

export default TextUpdaterNode;
