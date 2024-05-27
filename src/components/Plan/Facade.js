class WorkoutPlan {
  constructor() {
    this.exercises = {
      Chest: ['Push-ups', 'Bench Press', 'Chest Fly'], // Exercises for Chest
      Shoulder: ['Shoulder Press', 'Lateral Raises', 'Front Raises'], // Exercises for Shoulder
      Back: ['Pull-ups', 'Deadlifts', 'Bent-over Rows'], // Exercises for Back
      Abs: ['Crunches', 'Leg Raises', 'Planks'], // Exercises for Abs
      Bicep: ['Bicep Curls', 'Hammer Curls', 'Chin-ups'], // Exercises for Bicep
      Tricep: ['Tricep Dips', 'Skull Crushers', 'Tricep Extensions'], // Exercises for Tricep
      Legs: ['Squats', 'Lunges', 'Leg Press'] // Exercises for Legs
    };
  }

   // Return exercises for the specified body part or an empty array if not found
  getWorkoutsForBodyPart(bodyPart) {
    return this.exercises[bodyPart] || [];
  }
}

class WorkoutPlanFacade {
  constructor() {
    this.workoutPlan = new WorkoutPlan();
  }

  // Method to get workouts for a specific body part using the Facade
  getWorkoutsForBodyPart(bodyPart) {
    return this.workoutPlan.getWorkoutsForBodyPart(bodyPart);
  }
}

export default WorkoutPlanFacade;
