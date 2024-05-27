import React, { useState } from 'react';
import { Decorator, Walking, Jogging, Running } from './Decorator';
import WorkoutPlanFacade from './Facade';
import styled from 'styled-components';

const Section = styled.section`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 5px;
  text-align: center;
`;

const InputWrapper = styled.div`
  margin-bottom: 10px;
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
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 8px;
  margin-right: 5px;
`;

const Select = styled.select`
  padding: 8px;
  margin-right: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ProfilePage = () => {
  const [distanceWalking, setDistanceWalking] = useState('');
  const [timeWalking, setTimeWalking] = useState('');
  const [distanceJogging, setDistanceJogging] = useState('');
  const [timeJogging, setTimeJogging] = useState('');
  const [distanceRunning, setDistanceRunning] = useState('');
  const [timeRunning, setTimeRunning] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');

  const calculateCalories = () => {
    const caloriesWalking = calculateCaloriesForActivity(distanceWalking, timeWalking, 50);
    const caloriesJogging = calculateCaloriesForActivity(distanceJogging, timeJogging, 100);
    const caloriesRunning = calculateCaloriesForActivity(distanceRunning, timeRunning, 150);

    const totalCalories = caloriesWalking + caloriesJogging + caloriesRunning;
    setCaloriesBurned(totalCalories);
  };

  const calculateCaloriesForActivity = (distance, time, caloriesPerKm) => {
    if (distance && time) {
      const distanceInMeters = parseFloat(distance) * 1000;
      const timeInSeconds = parseFloat(time) * 60;
      return (caloriesPerKm * distanceInMeters * timeInSeconds) / (1000 * 60 * 60);
    }
    return 0;
  };

  // Clear the workouts when selecting a new body part
  const handleBodyPartChange = (event) => {
    setSelectedBodyPart(event.target.value);
    setWorkouts([]);
  };

  const buildWorkoutPlan = () => {
    if (selectedBodyPart) {
      const facade = new WorkoutPlanFacade();
      const selectedWorkouts = facade.getWorkoutsForBodyPart(selectedBodyPart);
      setWorkouts(selectedWorkouts);
    }
  };

  return (
    <Section>
      <Title>Workout Plan</Title>
      <Select value={selectedBodyPart} onChange={handleBodyPartChange}>
        <option value="">Select Body Part</option>
        <option value="Chest">Chest</option>
        <option value="Shoulder">Shoulder</option>
        <option value="Back">Back</option>
        <option value="Abs">Abs</option>
        <option value="Bicep">Bicep</option>
        <option value="Tricep">Tricep</option>
        <option value="Legs">Legs</option>
      </Select>
      <Button onClick={buildWorkoutPlan}>Get Plan</Button>
      <Title>Workouts</Title>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>{workout}</li>
        ))}
      </ul>
      <Title>Calories</Title>
      <InputWrapper>
        <Input
          type="number"
          placeholder="Walking Distance (km)"
          value={distanceWalking}
          onChange={(e) => setDistanceWalking(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Walking Time (minutes)"
          value={timeWalking}
          onChange={(e) => setTimeWalking(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="number"
          placeholder="Jogging Distance (km)"
          value={distanceJogging}
          onChange={(e) => setDistanceJogging(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Jogging Time (minutes)"
          value={timeJogging}
          onChange={(e) => setTimeJogging(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="number"
          placeholder="Running Distance (km)"
          value={distanceRunning}
          onChange={(e) => setDistanceRunning(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Running Time (minutes)"
          value={timeRunning}
          onChange={(e) => setTimeRunning(e.target.value)}
        />
      </InputWrapper>
      <Button onClick={calculateCalories}>Calculate Calories</Button>
      <div>Calories Burned: {caloriesBurned} kcal</div>
    </Section>
  );
};

export default ProfilePage;
