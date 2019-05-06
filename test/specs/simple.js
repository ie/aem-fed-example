// Load JSON specific to this page
let fullObj = require('./simple-json.js');

const loadComponents = require('../../src/loadComponents');

// Merge current object with other component objects
(async () => {
  await loadComponents(fullObj, function(fullObj) { 
    // console.log ("all component data", fullObj)
  });
})();

module.exports = fullObj;
  