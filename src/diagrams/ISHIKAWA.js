import React, { useState } from 'react';
import Fishbone from '@hophiphip/react-fishbone';

const IshikawaDiagram = ({ problem }) => {
    const [numChildren, setNumChildren] = useState(2);
    const [numSubChildren, setNumSubChildren] = useState(3);
    const [diagramData, setDiagramData] = useState(null);

    const [children, setChildren] = useState([
        { name: 'Child 1', subChildren: ['Subchild 1', 'Subchild 2', 'Subchild 3'] },
        { name: 'Child 2', subChildren: ['Subchild 1', 'Subchild 2', 'Subchild 3'] },
    ]);

    const handleChildNameChange = (index, value) => {
        const newChildren = [...children];
        newChildren[index].name = value;
        setChildren(newChildren);
    };

    const handleSubChildNameChange = (childIndex, subChildIndex, value) => {
        const newChildren = [...children];
        newChildren[childIndex].subChildren[subChildIndex] = value;
        setChildren(newChildren);
    };

    const handleNumChildrenChange = (e) => {
        const num = parseInt(e.target.value);
        setNumChildren(num);
        setChildren(prevChildren => {
            if (num > prevChildren.length) {
                return [...prevChildren, ...Array(num - prevChildren.length).fill().map(() => ({
                    name: `Child ${prevChildren.length + 1}`,
                    subChildren: Array(numSubChildren).fill().map((_, i) => `Subchild ${i + 1}`)
                }))];
            } else {
                return prevChildren.slice(0, num);
            }
        });
    };

    const handleNumSubChildrenChange = (e) => {
        const num = parseInt(e.target.value);
        setNumSubChildren(num);
        setChildren(prevChildren => prevChildren.map(child => ({
            ...child,
            subChildren: Array(num).fill().map((_, i) => i < child.subChildren.length ? child.subChildren[i] : `Subchild ${i + 1}`)
        })));
    };

    const generateDiagram = () => {
        const data = {
            name: problem,
            children: children.map(child => ({
                name: child.name,
                children: child.subChildren.map(subChild => ({ name: subChild }))
            }))
        };
        setDiagramData(data);
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

    const inputGroupStyle = {
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
    };

    const labelStyle = {
        marginRight: '10px',
        fontWeight: 'bold',
        color: '#34495e',
    };

    const inputStyle = {
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #bdc3c7',
        fontSize: '14px',
    };

    const childContainerStyle = {
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '15px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    };

    const childInputStyle = {
        ...inputStyle,
        width: '100%',
        marginBottom: '10px',
        fontWeight: 'bold',
    };

    const subChildInputStyle = {
        ...inputStyle,
        width: 'calc(100% - 20px)',
        marginLeft: '20px',
        marginBottom: '5px',
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

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Configuración del Diagrama de Ishikawa</h2>
            <div style={inputGroupStyle}>
                <label style={labelStyle}>Número de hijos: </label>
                <input type="number" value={numChildren} onChange={handleNumChildrenChange} min="1" max="10" style={inputStyle} />
            </div>
            <div style={inputGroupStyle}>
                <label style={labelStyle}>Número de subhijos: </label>
                <input type="number" value={numSubChildren} onChange={handleNumSubChildrenChange} min="1" max="10" style={inputStyle} />
            </div>
            {children.map((child, childIndex) => (
                <div key={childIndex} style={childContainerStyle}>
                    <input 
                        value={child.name} 
                        onChange={(e) => handleChildNameChange(childIndex, e.target.value)}
                        style={childInputStyle}
                        placeholder="Nombre del hijo"
                    />
                    {child.subChildren.map((subChild, subChildIndex) => (
                        <input 
                            key={subChildIndex}
                            value={subChild}
                            onChange={(e) => handleSubChildNameChange(childIndex, subChildIndex, e.target.value)}
                            style={subChildInputStyle}
                            placeholder={`Subhijo ${subChildIndex + 1}`}
                        />
                    ))}
                </div>
            ))}
            <button onClick={generateDiagram} style={buttonStyle}>Generar Diagrama</button>
            
            {diagramData && (
                <div style={{ marginTop: '30px' }}>
                    <Fishbone
                        items={diagramData}
                        wrapperStyle={{
                            width: '100%',
                            height: 500,
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            overflow: 'hidden',
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default IshikawaDiagram;