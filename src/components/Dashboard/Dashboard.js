import React, { useState } from 'react';
import FitnessAdapter from './Adapter';
import { MetricBMICalculator, ImperialBMICalculator } from './Strategy'; // Import the BMI calculators
import styled from 'styled-components';

const Section = styled.section`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 5px;
  text-align: center;
`;


const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  margin-top: 20px;
`;


const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
`;

const Dashboard = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [convertedWeight, setConvertedWeight] = useState('');
  const [convertedHeight, setConvertedHeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [heightUnit, setHeightUnit] = useState('ft');
  const [bmi, setBMI] = useState('');

  const adapter = new FitnessAdapter();

  const handleWeightChange = (e) => setWeight(e.target.value);
  const handleHeightChange = (e) => setHeight(e.target.value);

  const handleConvert = () => {
    setConvertedWeight(adapter.convertWeight(parseFloat(weight), weightUnit === 'lbs' ? 'kg' : 'lbs'));
    setConvertedHeight(adapter.convertHeight(parseFloat(height), heightUnit === 'ft' ? 'cm' : 'ft'));

    // Calculate BMI based on the selected unit system
    const bmiCalculator = weightUnit === 'lbs' ? new ImperialBMICalculator() : new MetricBMICalculator();
    const calculatedBMI = bmiCalculator.calculateBMI(parseFloat(weight), parseFloat(height));
    setBMI(calculatedBMI);
  };

  const handleWeightUnitChange = (e) => setWeightUnit(e.target.value);
  const handleHeightUnitChange = (e) => setHeightUnit(e.target.value);

  // Function to interpret BMI value
  const interpretBMI = (bmi) => {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  };

  return (
    <Section>
      <Title>Dashboard</Title>
      <ContentWrapper>
        <InputWrapper>
          <h2>Weight</h2>
          <Input type="number" value={weight} onChange={handleWeightChange} placeholder={`Enter weight in ${weightUnit}`} />
          <Select value={weightUnit} onChange={handleWeightUnitChange}>
            <option value="lbs">lbs</option>
            <option value="kg">kg</option>
          </Select>
          <h3>Converted Weight: {convertedWeight} {weightUnit === 'lbs' ? 'kg' : 'lbs'}</h3>
        </InputWrapper>
        <InputWrapper>
          <h2>Height</h2>
          <Input type="number" value={height} onChange={handleHeightChange} placeholder={`Enter height in ${heightUnit}`} />
          <Select value={heightUnit} onChange={handleHeightUnitChange}>
            <option value="ft">ft</option>
            <option value="cm">cm</option>
          </Select>
          <h3>Converted Height: {convertedHeight} {heightUnit === 'ft' ? 'cm' : 'ft'}</h3>
        </InputWrapper>
        <Button onClick={handleConvert}>Convert & Calculate BMI</Button>
        {bmi && <h2>Your BMI: {bmi} ({interpretBMI(parseFloat(bmi))})</h2>}
      </ContentWrapper>
    </Section>
  );
};

export default Dashboard;