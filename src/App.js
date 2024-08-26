// src/App.js
import React, { useState } from 'react';
import Foda from './diagrams/FODA';
import IshikawaDiagram from './diagrams/ISHIKAWA';
import ParetoChart from './diagrams/PARETO';
import SixThinkingHats from './diagrams/SEISS.js';
import CATWOEForm from './diagrams/CAT.js';

function App() {
  const [problem, setProblem] = useState('');
  const [selectedAnalysis, setSelectedAnalysis] = useState('');

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
    <div className="App">
      <form>
        <label>
          Ingresa la problemática:
          <input
            type="text"
            value={problem}
            onChange={handleInputChange}
            style={{ margin: '10px', padding: '5px' }}
          />
        </label>
        <button type="submit" onClick={(e) => handleSubmit(e, 'FODA')}>Generar FODA</button>
        <button type="submit" onClick={(e) => handleSubmit(e, 'CATWDA')}>Generar CATWDA</button>
        <button type="submit" onClick={(e) => handleSubmit(e, 'ISHIKAWA')}>Generar ISHIKAWA</button>
        <button type="submit" onClick={(e) => handleSubmit(e, 'PARETO')}>Generar D. PARETO</button>
        <button type="submit" onClick={(e) => handleSubmit(e, 'SEIS')}>Generar 6 sombreros</button>
      </form>

      {/* Mostrar el componente seleccionado si hay una problemática */}
      {selectedAnalysis === 'FODA' && <Foda problem={problem} />}
      {selectedAnalysis === 'CATWDA' && <CATWOEForm />}
      {selectedAnalysis === 'ISHIKAWA' && <IshikawaDiagram problem={problem} />}
      {selectedAnalysis === 'PARETO' && <ParetoChart />}
      {selectedAnalysis === 'SEIS' && <SixThinkingHats />}
      {/* Puedes agregar otros componentes similares para CATWOE, etc. */}
    </div>
  );
}

export default App;
