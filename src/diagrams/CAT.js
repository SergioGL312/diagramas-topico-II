import React, { useState } from 'react';

const CATWOEForm = () => {
    const [catwoe, setCatwoe] = useState({
      customers: '',
      actors: '',
      transformation: '',
      worldview: '',
      owners: '',
      environment: ''
    });
  
    const [showResult, setShowResult] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCatwoe((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setShowResult(true);
    };
  
    const containerStyle = {
      padding: '30px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
    };
  
    const titleStyle = {
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: '30px',
    };
  
    const formStyle = {
      display: 'grid',
      gap: '20px',
    };
  
    const inputContainerStyle = {
      display: 'flex',
      flexDirection: 'column',
    };
  
    const labelStyle = {
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#34495e',
    };
  
    const inputStyle = {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #bdc3c7',
      fontSize: '16px',
    };
  
    const buttonStyle = {
      padding: '12px 24px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s',
    };
  
    const resultStyle = {
      marginTop: '30px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };
  
    return (
      <div style={containerStyle}>
        <h2 style={titleStyle}>Análisis CATWOE</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          {['customers', 'actors', 'transformation', 'worldview', 'owners', 'environment'].map((field) => (
            <div key={field} style={inputContainerStyle}>
              <label style={labelStyle}>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <input
                type="text"
                name={field}
                value={catwoe[field]}
                onChange={handleChange}
                style={inputStyle}
                placeholder={`Ingrese ${field}`}
                required
              />
            </div>
          ))}
  
          <button type="submit" style={buttonStyle}>Ver Análisis</button>
        </form>
  
        {showResult && (
          <div style={resultStyle}>
            <h3 style={{...titleStyle, marginTop: 0}}>Resumen del Análisis CATWOE</h3>
            {Object.entries(catwoe).map(([key, value]) => (
              <p key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  };

export default CATWOEForm;