const { retrieveJsonData } = require('../../../../tools/loadJsonData'),

  jsonFilePath = 'test/components/react1/dev/react1.json',
  jsonApiUrl = null;

module.exports = new Promise(async (resolve) => {
  let jsonData = await retrieveJsonData(jsonFilePath, jsonApiUrl);
  resolve (jsonData);
});
