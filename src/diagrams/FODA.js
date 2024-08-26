import React, { useState } from 'react';

const Foda = ({ problem }) => {
    const [fodaData, setFodaData] = useState({
        fortalezas: ['', '', ''],
        debilidades: ['', '', ''],
        oportunidades: ['', '', ''],
        amenazas: ['', '', '']
    });

    const sectionStyle = {
        padding: '20px',
        borderRadius: '10px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    };

    const handleInputChange = (section, index, value) => {
        setFodaData(prevData => ({
            ...prevData,
            [section]: prevData[section].map((item, i) => i === index ? value : item)
        }));
    };

    const addNewItem = (section) => {
        setFodaData(prevData => ({
            ...prevData,
            [section]: [...prevData[section], '']
        }));
    };

    const renderSection = (title, data, color, emoji, section) => (
        <div style={{ ...sectionStyle, backgroundColor: color }}>
            <h2 style={{ textAlign: 'center', margin: '0 0 15px 0' }}>{title}</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                {data.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => handleInputChange(section, index, e.target.value)}
                            style={{ 
                                width: '100%', 
                                background: 'transparent', 
                                border: 'none', 
                                borderBottom: '1px solid white', 
                                color: 'white',
                                padding: '5px 0'
                            }}
                        />
                    </li>
                ))}
            </ul>
            <div style={{ 
                display: 'flex', 
                justifyContent: section === 'debilidades' || section === 'amenazas' ? 'flex-end' : 'flex-start'
            }}>
                <span 
                    style={{ fontSize: '40px', cursor: 'pointer' }} 
                    onClick={() => addNewItem(section)}
                >
                    {emoji}
                </span>
            </div>
        </div>
    );

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '80vh', 
            padding: '20px', 
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gridTemplateRows: '1fr 1fr',
                gap: '10px',
                width: '600px',
                height: '600px',
                position: 'relative',
            }}>
                {renderSection('Fortalezas', fodaData.fortalezas, '#3498db', '🔗', 'fortalezas')}
                {renderSection('Debilidades', fodaData.debilidades, '#e67e22', '🔗', 'debilidades')}
                {renderSection('Oportunidades', fodaData.oportunidades, '#2ecc71', '💡', 'oportunidades')}
                {renderSection('Amenazas', fodaData.amenazas, '#e74c3c', '⚠️', 'amenazas')}
                <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    width: '150px',
                    height: '150px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                }}>
                    <h3 style={{ margin: 0, color: '#333' }}>ANÁLISIS</h3>
                    <h2 style={{ margin: '5px 0', color: '#333' }}>FODA</h2>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{problem}</p>
                </div>
            </div>
        </div>
    );
};

export default Foda;