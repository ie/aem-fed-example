const { extendJson, retrieveJsonData } = require('../../tools/loadJsonData');
const loadComponents = require('../../tools/loadComponents');

const jsonFilePath = "test/specs/simple.json";
const jsonApiUrl = null;

module.exports = new Promise(async (resolve) => {
  let jsonData = await retrieveJsonData(jsonFilePath, jsonApiUrl);
  let allComponentData = await loadComponents();
  resolve (extendJson (allComponentData, jsonData));
});
