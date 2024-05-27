class Workout {
  constructor(name, sets, reps) {
    this.name = name;
    this.sets = sets;
    this.reps = reps;
  }

  // Method to get information about the workout
  getInfo() {
    return `${this.name} - ${this.sets} Sets, ${this.reps} Reps`;
  }
}

class Routine {
  constructor(name) {
    this.name = name;
    this.workouts = [];
  }

  // Method to add a workout to the routine
  addWorkout(workout) {
    this.workouts.push(workout);
  }

  // Method to get information about the routine
  getInfo() {
    return `${this.name}: ${this.workouts.map(w => w.getInfo()).join(', ')}`;
  }
}

export { Workout, Routine };
