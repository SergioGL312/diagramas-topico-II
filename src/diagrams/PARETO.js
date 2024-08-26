import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
} from 'recharts';
import styled from 'styled-components';

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const GenerateButton = styled(Button)`
  display: block;
  margin: 20px auto;
  background-color: #008CBA;

  &:hover {
    background-color: #007B9A;
  }
`;

const AnalysisSection = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const AnalysisTitle = styled.h3`
  color: #333;
  margin-bottom: 10px;
`;

const CategoryList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CategoryItem = styled.li`
  background-color: #e0e0e0;
  margin-bottom: 5px;
  padding: 5px 10px;
  border-radius: 4px;
  display: inline-block;
  margin-right: 5px;
`;

const ParetoChart = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newValue, setNewValue] = useState('');
  const [chartData, setChartData] = useState([]);

  const addCategory = () => {
    if (newCategory && newValue) {
      setCategories([...categories, { name: newCategory, value: parseFloat(newValue) }]);
      setNewCategory('');
      setNewValue('');
    }
  };

  const generateChart = () => {
    const sortedData = [...categories].sort((a, b) => b.value - a.value);
    const total = sortedData.reduce((sum, item) => sum + item.value, 0);
    let accumulatedPercentage = 0;
    const data = sortedData.map(item => {
      const percentage = (item.value / total) * 100;
      accumulatedPercentage += percentage;
      return {
        ...item,
        percentage,
        accumulatedPercentage
      };
    });

    setChartData(data);
  };

  return (
    <Container>
      <Title>Crear Diagrama de Pareto</Title>
      
      <Form>
        <Input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nombre de la categoría"
        />
        <Input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Valor"
        />
        <Button onClick={addCategory}>Agregar</Button>
      </Form>
      
      <GenerateButton onClick={generateChart}>Generar Diagrama</GenerateButton>

      {chartData.length > 0 && (
        <ComposedChart
          width={800}
          height={400}
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="value" fill="#8884d8" name="Valor" />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="accumulatedPercentage"
            stroke="#82ca9d"
            name="% Acumulado"
          />
        </ComposedChart>
      )}

      {chartData.length > 0 && (
        <AnalysisSection>
          <AnalysisTitle>Análisis del Diagrama de Pareto</AnalysisTitle>
          <p>Las categorías que contribuyen al 80% del problema son:</p>
          <CategoryList>
            {chartData.filter(item => item.accumulatedPercentage <= 80).map(item => (
              <CategoryItem key={item.name}>{item.name}</CategoryItem>
            ))}
          </CategoryList>
        </AnalysisSection>
      )}
    </Container>
  );
};

export default ParetoChart;