import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Workflow from './Workflow';
import { Controls } from 'reactflow';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Workflow/> */}
    <App />
  </React.StrictMode>
);


