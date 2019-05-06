const loadComponents = require('../../src/loadComponents');

let fullObj = {
  name: 'World 2',
  properties: {
    title: 'Hello',
    fruits: ['Apple 2', 'Banana 2', 'Orange 2'],
  }
};

// Merge current object with other component objects
(async () => {
  await loadComponents(fullObj, function(fullObj) { 
    // console.log ("all component data", fullObj)
  });
})();

module.exports = fullObj;