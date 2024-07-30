'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    console.log("input: " + input);
    
    // Get the number and unit from the input
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    
    // Handle invalid number and unit cases
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return res.json({ error: "invalid number and unit" });
    } else if (initNum === "invalid number") {
      return res.json({ error: "invalid number" });
    } else if (initUnit === "invalid unit") {
      return res.json({ error: "invalid unit" });
    }
    
    // Perform the conversion
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const resultString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
    // Send the response
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: resultString
    });
  });

};
