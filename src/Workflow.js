import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import './overview.css';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Divider,
  Button,
  IconButton,
} from '@mui/material';

export default function RowAndColumnGap() {
  const [workflowName, setWorkflowName] = React.useState('');
  const [workflows, setWorkflows] = React.useState([]);
  const navigate = useNavigate();


  function handleDeleteRow(index) {
    const newWorkflows = [...workflows];
    newWorkflows.splice(index, 1);
    setWorkflows(newWorkflows);
  }

  function createWorkflow() {
    if (workflowName) {
      setWorkflows((prevWorkflows) => [
        ...prevWorkflows,
        { name: workflowName, imageUrl: 'C:/Users/user/Desktop/Deepika_assessments/Workflow_react/src/Screenshot.png' }, // Add imageUrl property
      ]);
      setWorkflowName('');
    }
  }

  function handleWorkflowClick(workflowName) {
    navigate(`/workflow/${workflowName}`);
  }

  return (
    <div className='container'>
      <div className="upper">
        <h1> Create a New Workflow </h1>
        <TextField
          id="workflowName"
          label="Name of the workflow"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          variant="standard"
        />
        <Button
          variant="contained"
          
          onClick={createWorkflow}
        >
          Create WorkFlow
        </Button>
        <Divider />
      </div>
      <br />
      <Divider />
      <div className="lower">
        <List>
          {workflows.map((workflow, index) => (
            <ListItem
              key={index}
              onClick={() => handleWorkflowClick(workflow.name)}
              button
            >
              <ListItemAvatar>
                <Avatar alt={workflow.name} src={workflow.imageUrl} />
              </ListItemAvatar>
              <ListItemText primary={workflow.name} />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteRow(index)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
