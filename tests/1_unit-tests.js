const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('Function convertHandler.getNum(input)', function() {
    test('Whole number input', function(done) {
      let input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal number input', function(done) {
      let input = '3.1mi';
      assert.equal(convertHandler.getNum(input), 3.1);
      done();
    });

    test('Fractional input', function(done) {
      let input = '3/2km';
      assert.equal(convertHandler.getNum(input), 1.5);
      done();
    });

    test('Fractional input with a decimal', function(done) {
      let input = '3.5/2lbs';
      assert.equal(convertHandler.getNum(input), 1.75);
      done();
    });

    test('Invalid input (double fraction)', function(done) {
      let input = '3/2/3kg';
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    });

    test('No numerical input', function(done) {
      let input = 'kg';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite('Function convertHandler.getUnit(input)', function() {
    test('Valid unit inputs', function(done) {
      let input = [
        'gal', 'mi', 'km', 'lbs', 'kg',
        'GAL', 'MI', 'KM', 'LBS', 'KG'
      ];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit(ele), ele.toLowerCase());
      });
      assert.equal(convertHandler.getUnit('l'), 'L');
      assert.equal(convertHandler.getUnit('L'), 'L');
      done();
    });

    test('Invalid unit input', function(done) {
      let input = '32g';
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    test('Return unit for valid input unit', function(done) {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {
    test('Return spelled-out string unit for valid input unit', function(done) {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let expect = [
        'gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'
      ];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.convert(num, unit)', function() {
    test('Convert gal to L', function(done) {
      let input = [5, 'gal'];
      let expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Convert L to gal', function(done) {
      let input = [5, 'L'];
      let expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Convert mi to km', function(done) {
      let input = [5, 'mi'];
      let expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Convert km to mi', function(done) {
      let input = [5, 'km'];
      let expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Convert lbs to kg', function(done) {
      let input = [5, 'lbs'];
      let expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Convert kg to lbs', function(done) {
      let input = [5, 'kg'];
      let expected = 11.0231;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
  });

});