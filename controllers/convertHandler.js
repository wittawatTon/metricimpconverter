function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const match = input.match(/[.\d\/]+/g) || ["1"];
    result = match[0];

    // Handle fractions
    if (result.includes('/')) {
      const numbers = result.split('/');
      if (numbers.length != 2) {
        return "invalid number";
      }
      result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
    } else {
      result = parseFloat(result);
    }

    if (isNaN(result)) {
      return "invalid number";
    }

    return result;
  };
  
  this.getUnit = function(input) {
    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const unit = input.match(/[a-zA-Z]+/g);
    if (!unit || units.indexOf(unit[0].toLowerCase()) === -1) {
      return "invalid unit";
    }
    return unit[0].toLowerCase() === 'l' ? 'L' : unit[0].toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const unitSpelling = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return unitSpelling[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = "invalid unit";
    }

    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const spelledOutInitUnit = this.spellOutUnit(initUnit);
    const spelledOutReturnUnit = this.spellOutUnit(returnUnit);
    let result = `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOutReturnUnit}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
