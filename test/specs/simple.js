const { extendJson, retrieveJsonData } = require('../../src/loadJsonData');
const loadComponents = require('../../src/loadComponents');

const jsonFilePath = "test/specs/simple.json";
const jsonApiUrl = null;

module.exports = new Promise(function(resolve){
  (async () => {
     let jsonData = await retrieveJsonData(jsonFilePath, jsonApiUrl);
     let allComponentData = await loadComponents();
     resolve (extendJson (allComponentData, jsonData));
  })();
});
