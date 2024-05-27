class BMICalculator {
  calculateBMI(weight, height) {
    throw new Error('calculateBMI method must be implemented');
  }
}

// Strategy for BMI calculation using metric units (kg and cm)
export class MetricBMICalculator extends BMICalculator {
  calculateBMI(weight, height) {
    const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
    return bmi;
  }
}

// Strategy for BMI calculation using imperial units (lbs and ft)
export class ImperialBMICalculator extends BMICalculator {
  calculateBMI(weight, height) {
    const bmi = ((weight / (height * height)) * 703).toFixed(2);
    return bmi;
  }
}
