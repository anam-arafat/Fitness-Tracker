class Decorator {
  constructor(name) {
    this.name = name;
    this.activities = [];
  }

  // Method to add activity to the profile
  addActivity(activity) {
    this.activities.push(activity);
  }

  // Method to get the profile information
  getProfile() {
    const totalCaloriesBurned = this.calculateTotalCaloriesBurned();
    return `${this.name}, Total Calories Burned: ${totalCaloriesBurned} kcal`;
  }

  // Method to calculate total calories burned by all activities
  calculateTotalCaloriesBurned() {
    let totalCalories = 0;
    for (const activity of this.activities) {
      totalCalories += activity.calculateCaloriesBurned();
    }
    return totalCalories;
  }

}

class Activity {
  constructor(name, distance, time) {
    this.name = name;
    this.distance = distance;
    this.time = time;
  }

  // Default implementation returns 0 calories burned
  calculateCaloriesBurned() {
    return 0; 
  }
}

// Define subclass for walking activity
class Walking extends Activity {
  calculateCaloriesBurned() {
    const caloriesPerKm = 50;
    return (caloriesPerKm * this.distance) / 1000;
  }
}

// Define subclass for jogging activity
class Jogging extends Activity {
  calculateCaloriesBurned() {
    const caloriesPerKm = 100;
    return (caloriesPerKm * this.distance) / 1000;
  }
}

// Define subclass for running activity
class Running extends Activity {
  calculateCaloriesBurned() {
    const caloriesPerKm = 150;
    return (caloriesPerKm * this.distance) / 1000;
  }
}

// Define a constant object to hold calories burned per kilometer for each activity type
const CALORIES_PER_KM = {
  walking: 50,
  jogging: 100,
  running: 150,
};

// Define a function to get calories burned per kilometer for a given activity type
const getCaloriesPerKm = (activityType) => {
  return CALORIES_PER_KM[activityType];
};

export { Decorator, Walking, Jogging, Running };
