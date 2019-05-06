const loadComponents = require('../../src/loadComponents');

let fullObj = {
  name: 'World',
  properties: {
    title: 'Hello',
    fruits: ['Apple', 'Banana', 'Orange'],
  }
};

// Merge current object with other component objects
(async () => {
  await loadComponents(fullObj, function(fullObj) { 
    // console.log ("all component data", fullObj)
  });
})();

module.exports = fullObj;
  