// src/App.js
import React, { useState } from 'react';
import Foda from './diagrams/FODA';
import IshikawaDiagram from './diagrams/ISHIKAWA';
import ParetoChart from './diagrams/PARETO';
// import SixThinkingHats from './diagrams/SEISS.js';
import CATWOEForm from './diagrams/CAT.js';

import ImageCollage from './collages/ImageCollage.js';

import './App.css'; // Asegúrate de crear este archivo CSS

function App() {
  const [problem, setProblem] = useState('');
  const [selectedAnalysis, setSelectedAnalysis] = useState('');
  const imageUrls = [
    {src: './collage/1.jpg', description: 'ss'},
    {src: './collage/2.jpg', description: 'ss'},
    {src: './collage/3.jpg', description: 'ss'},
    {src: './collage/4.jpg', description: 'ss'},
    {src: './collage/5.jpg', description: 'ss'},
    {src: './collage/6.jpg', description: 'ss'},
    {src: './collage/7.jpg', description: 'ss'},
    {src: './collage/8.jpg', description: 'ss'},
    {src: './collage/9.jpg', description: 'ss'}
  ];

  const handleInputChange = (e) => {
    setProblem(e.target.value);
  };

  const handleSubmit = (e, analysisType) => {
    e.preventDefault();
    if (problem.trim() === '') {
      alert('Por favor, ingresa una problemática para ver el diagrama.');
    } else {
      setSelectedAnalysis(analysisType);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Análisis de Problemas</h1>
      </header>
      <main className="app-main">
        <form className="problem-form">
          <div className="input-group">
            <label htmlFor="problem-input">Ingresa la problemática:</label>
            <input
              id="problem-input"
              type="text"
              value={problem}
              onChange={handleInputChange}
              placeholder="Describe el problema aquí"
            />
          </div>
          <div className="button-group">
            <button type="submit" onClick={(e) => handleSubmit(e, 'FODA')}>FODA</button>
            <button type="submit" onClick={(e) => handleSubmit(e, 'CATWDA')}>CATWDA</button>
            <button type="submit" onClick={(e) => handleSubmit(e, 'ISHIKAWA')}>ISHIKAWA</button>
            <button type="submit" onClick={(e) => handleSubmit(e, 'PARETO')}>D. PARETO</button>
            <button type="submit" onClick={(e) => handleSubmit(e, 'SEIS')}>6 sombreros</button>
            <button type="submit" onClick={(e) => handleSubmit(e, 'Collage')}>Collage</button>
          </div>
        </form>
        <div className="diagram-container">
          {selectedAnalysis === 'FODA' && <Foda problem={problem} />}
          {selectedAnalysis === 'CATWDA' && <CATWOEForm />}
          {selectedAnalysis === 'ISHIKAWA' && <IshikawaDiagram problem={problem} />}
          {selectedAnalysis === 'PARETO' && <ParetoChart />}
          {selectedAnalysis === 'Collage' && <ImageCollage images={imageUrls} />}
        </div>
      </main>
    </div>
  );
}

export default App;