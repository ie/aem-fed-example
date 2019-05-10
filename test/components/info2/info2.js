const { retrieveJsonData } = require('../../../tools/loadJsonData'),

  jsonFilePath = 'test/components/info2/info2.json',
  jsonApiUrl = null;

module.exports = new Promise(async (resolve) => {
  let jsonData = await retrieveJsonData(jsonFilePath, jsonApiUrl);
  resolve (jsonData);
});
