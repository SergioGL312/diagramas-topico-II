import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #343a40;
  text-align: center;
  margin-bottom: 30px;
`;

const HatContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const HatButton = styled.button`
  background-color: ${props => props.color};
  color: ${props => (props.color === 'white' || props.color === 'yellow' ? 'black' : 'white')};
  border: none;
  padding: 15px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: transform 0.2s, box-shadow 0.2s;
  margin: 5px;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const ActiveHatSection = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
`;

const ActiveHatTitle = styled.h2`
  color: ${props => props.color};
  margin-bottom: 15px;
`;

const HatDescription = styled.p`
  color: #6c757d;
  font-style: italic;
  margin-bottom: 15px;
`;

const ThoughtTextarea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
  margin-top: 10px;

  &:focus {
    outline: none;
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
`;

const SummarySection = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const SummaryTitle = styled.h2`
  color: #343a40;
  margin-bottom: 20px;
`;

const ThoughtSummary = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f1f3f5;
  border-radius: 4px;
`;

const ThoughtColor = styled.strong`
  color: ${props => props.color};
`;

const SixThinkingHats = () => {
  const [activeHat, setActiveHat] = useState(null);
  const [thoughts, setThoughts] = useState({
    white: '',
    red: '',
    black: '',
    yellow: '',
    green: '',
    blue: '',
  });

  const hats = [
    { color: 'white', description: 'Hechos y datos objetivos' },
    { color: 'red', description: 'Emociones y sentimientos' },
    { color: 'black', description: 'Juicio crítico y precaución' },
    { color: 'yellow', description: 'Optimismo y beneficios' },
    { color: 'green', description: 'Creatividad y nuevas ideas' },
    { color: 'blue', description: 'Proceso y organización' },
  ];

  const handleHatClick = (color) => {
    setActiveHat(color);
  };

  const handleThoughtChange = (e) => {
    setThoughts({ ...thoughts, [activeHat]: e.target.value });
  };

  return (
    <Container>
      <Title>Los 6 Sombreros para Pensar</Title>
      <HatContainer>
        {hats.map(({ color, description }) => (
          <HatButton
            key={color}
            color={color}
            onClick={() => handleHatClick(color)}
            title={description}
          >
            {color.charAt(0).toUpperCase()}
          </HatButton>
        ))}
      </HatContainer>
      {activeHat && (
        <ActiveHatSection>
          <ActiveHatTitle color={activeHat}>
            Sombrero {activeHat.charAt(0).toUpperCase() + activeHat.slice(1)}
          </ActiveHatTitle>
          <HatDescription>{hats.find(hat => hat.color === activeHat).description}</HatDescription>
          <ThoughtTextarea
            value={thoughts[activeHat]}
            onChange={handleThoughtChange}
            placeholder={`Escribe tus pensamientos para el sombrero ${activeHat}...`}
          />
        </ActiveHatSection>
      )}
      <SummarySection>
        <SummaryTitle>Resumen de Pensamientos</SummaryTitle>
        {Object.entries(thoughts).map(([color, thought]) => (
          thought && (
            <ThoughtSummary key={color}>
              <ThoughtColor color={color}>{color.charAt(0).toUpperCase() + color.slice(1)}:</ThoughtColor> {thought}
            </ThoughtSummary>
          )
        ))}
      </SummarySection>
    </Container>
  );
};

export default SixThinkingHats;