import React, { useState, useEffect } from 'react';
import { Workout, Routine } from './Composite';
import NotificationService from './Observer';
import styled from 'styled-components';

const notificationService = new NotificationService();

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
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
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
`;

const WorkoutTracker = () => {
  const [routine, setRoutine] = useState(new Routine('Routine'));
  const [notifications, setNotifications] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [newWorkoutReps, setNewWorkoutReps] = useState('');
  const [newWorkoutSets, setNewWorkoutSets] = useState('');

  useEffect(() => {
    const handleNotification = (notification) => {
      setNotifications((prev) => [...prev, notification]);
    };

    notificationService.subscribe({ update: handleNotification });
    return () => notificationService.unsubscribe({ update: handleNotification });
  }, []);

  const addWorkout = () => {
    const newWorkout = new Workout(selectedWorkout, newWorkoutSets, newWorkoutReps);
    const updatedRoutine = { ...routine, workouts: [...routine.workouts, newWorkout] };
    setRoutine(updatedRoutine);

    const totalRepetitions = newWorkoutSets * newWorkoutReps;
    notificationService.updateTotalRepetitions(totalRepetitions);

    setSelectedWorkout('');
    setNewWorkoutReps('');
    setNewWorkoutSets('');
  };

  const handleWorkoutSelection = (event) => {
    setSelectedWorkout(event.target.value);
  };

  const handleNewWorkoutRepsChange = (event) => {
    setNewWorkoutReps(parseInt(event.target.value));
  };

  const handleNewWorkoutSetsChange = (event) => {
    setNewWorkoutSets(parseInt(event.target.value));
  };

  return (
    <Section>
      <Title>Workout Tracker</Title>
      <InputWrapper>
        <Select value={selectedWorkout} onChange={handleWorkoutSelection}>
          <option value="">Select Workout</option>
          <option value="Chest">Chest</option>
          <option value="Shoulder">Shoulder</option>
          <option value="Back">Back</option>
          <option value="Bicep">Bicep</option>
          <option value="Tricep">Tricep</option>
          <option value="Abs">Abs</option>
          <option value="Legs">Legs</option>
        </Select>
        <Input
          type="number"
          placeholder="Sets"
          value={newWorkoutSets}
          onChange={handleNewWorkoutSetsChange}
        />
        <Input
          type="number"
          placeholder="Reps"
          value={newWorkoutReps}
          onChange={handleNewWorkoutRepsChange}
        />
        <Button onClick={addWorkout}>Add Workout</Button>
      </InputWrapper>
      {routine.workouts.map((workout, index) => (
        <div key={index}>{workout.getInfo()}</div>
      ))}
      <div className="notifications">
        <h2>Updates</h2>
        {notifications.map((notification, index) => (
          <div key={index}>
            {notification.notification}: {notification.totalRepetitions}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default WorkoutTracker;
