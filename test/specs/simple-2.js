// Load JSON specific to this page
let fullObj = require('./simple-2-json.js');

const loadComponents = require('../../src/loadComponents');

// Merge current page object with other component objects
(async () => {
  await loadComponents(fullObj, function(fullObj) { 
    // console.log ("all component data merged with current page data", fullObj)
  });
})();

module.exports = fullObj;