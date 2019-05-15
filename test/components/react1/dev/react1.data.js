const { retrieveJsonData } = require('../../../../tools/loadJsonData'),

  jsonFilePath = 'test/components/info/dev/info.json',
  jsonApiUrl = null;

module.exports = new Promise(async (resolve) => {
  let jsonData = await retrieveJsonData(jsonFilePath, jsonApiUrl);
  resolve (jsonData);
});
