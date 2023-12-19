import { Divider } from '@mui/material';
import { Handle, Position } from 'reactflow';


export default function TextUpdaterNode({ data, isConnectable }) {

  return (
    <div className="text-updater-node" style={{border:`${data.focus? 2:1}px solid ${data.focus? 'pink':'black'}`}}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div id='attributes'>
        <span>{data.value}</span>
        <Divider/>
        {
          data.att.map((e) => {
            if(e!==1) {
            return (<>
              <label htmlFor="text">{e[0]} : {e[1]}</label>
            </>)
            }
          })
        }
        
      </div>

      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable}/>
    </div>
  );
}
