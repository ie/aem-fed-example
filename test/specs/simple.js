const { extendJson, retrieveJsonData } = require('../../tools/loadJsonData');
const loadComponents = require('../../tools/loadComponents'),

  jsonFilePath = 'test/specs/simple.json',
  jsonApiUrl = null;

module.exports = new Promise(async (resolve) => {
  let jsonData = await retrieveJsonData(jsonFilePath, jsonApiUrl),
    allComponentData = await loadComponents();
  resolve (extendJson (allComponentData, jsonData));
});
