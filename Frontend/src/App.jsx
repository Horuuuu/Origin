
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MisAcciones from './components/MisAcciones'; 
import DetalleDeAccion from './components/DetalleDeAccion';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/misAcciones" element={<MisAcciones />} />
          <Route path="/detalleDeAccion/:symbol" element={<DetalleDeAccion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

