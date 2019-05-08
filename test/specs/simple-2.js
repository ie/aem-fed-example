const { extendJson, retrieveJsonData } = require('../../src/loadJsonData');
const loadComponents = require('../../src/loadComponents');

const jsonFilePath = "test/specs/simple-2.json";
const jsonApiUrl = null;

module.exports = new Promise(async (resolve) => {
  let jsonData = await retrieveJsonData(jsonFilePath, jsonApiUrl);
  let allComponentData = await loadComponents();
  resolve (extendJson (allComponentData, jsonData));
});
