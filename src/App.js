import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import WorkoutTracker from './components/Tracker/WorkoutTracker';
import ProfilePage from './components/Plan/Plan';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Dashboard />
      <WorkoutTracker />
      <ProfilePage />
    </div>
  );
};

export default App;
