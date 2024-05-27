class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class NotificationService extends Observable {
  constructor() {
    super(); // Call the constructor of the parent class
    this.totalRepetitions = 0;
    this.targetRepetitions = 120;
  }

  // Method to send notification to observers
  sendNotification(notification) {
    // Notify observers with the current total repetitions
    this.notify({ notification, totalRepetitions: this.totalRepetitions });

    // Check if the target repetitions are reached
    if (this.totalRepetitions >= this.targetRepetitions) {
      // Notify observers about reaching the target
      this.notify({ notification: "Congratulations! You've reached the target.", totalRepetitions: this.totalRepetitions });
    } else {
      // Notify observers about remaining repetitions
      const remainingRepetitions = this.targetRepetitions - this.totalRepetitions;
      this.notify({ notification: `Remaining repetitions: ${remainingRepetitions}`, totalRepetitions: this.totalRepetitions });
    }
  }

  // Method to update total repetitions
  updateTotalRepetitions(repetitions) {
    this.totalRepetitions += repetitions;
    this.sendNotification("Total repetitions updated.");
  }
}

export default NotificationService;
