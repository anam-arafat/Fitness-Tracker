class FitnessAdapter {
  constructor() {
    // Default units for weight and height
    this.weightUnit = 'kg';
    this.heightUnit = 'cm';
  }

  // Method to convert weight
  convertWeight(value, toUnit) {
    // Convert from kg to lbs
    if (toUnit === 'kg') {
      return (value * 0.453592).toFixed(2); // Convert to kg and round to 2 decimal places
    } 
    // Convert from lbs to kg
    else if (toUnit === 'lbs') {
      return (value / 0.453592).toFixed(2); // Convert to lbs and round to 2 decimal places
    }
    throw new Error('Invalid weight unit');
  }

  // Method to convert height
  convertHeight(value, toUnit) {
    // Convert from cm to ft
    if (toUnit === 'ft') {
      return (value / 30.48).toFixed(2); // Convert to ft and round to 2 decimal places
    } 
    // Convert from ft to cm
    else if (toUnit === 'cm') {
      return (value * 30.48).toFixed(2); // Convert to cm and round to 2 decimal places
    }
    throw new Error('Invalid height unit');
  }

  // Method to get converted weight and height data
  getConvertedData(weight, height, weightUnit, heightUnit) {
    // Convert weight and height to the specified units
    return {
      weight: this.convertWeight(weight, weightUnit),
      height: this.convertHeight(height, heightUnit)
    };
  }
}

export default FitnessAdapter;
