const loadComponents = require('../../src/loadComponents');

const jsonFilePath = "test/specs/simple-2.json";
const jsonApiUrl = null;

module.exports = new Promise(function(resolve, reject){
  (async () => {
     resolve (await loadComponents(jsonFilePath, jsonApiUrl));
  })();
});
