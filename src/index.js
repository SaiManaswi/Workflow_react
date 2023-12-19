import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Flow from './App';
import Workflow from './Workflow';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Workflow />} />
        <Route path="/workflow/:workflowName" element={<Flow />} />
      </Routes>
    </Router>
  </React.StrictMode>
);


