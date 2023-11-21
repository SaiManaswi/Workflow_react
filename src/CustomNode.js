// import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';



export default function TextUpdaterNode({ data, isConnectable }) {
  // const onChange = useCallback((evt) => {
  //   console.log('what!')
  //   console.log(evt.target.value);
    
  // }, []);

  return (
    <div className="text-updater-node" style={{border:`${data.focus? 2:1}px solid ${data.focus? 'pink':'black'}`}}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div id='attributes'>
        <p>{data.value}</p>
        {
          data.att.map((e) => {
            
            return (<>
              <label htmlFor="text">{e[0]} : {e[1]}</label>
            </>)
          })
        }
        
      </div>

      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable}/>
    </div>
  );
}
