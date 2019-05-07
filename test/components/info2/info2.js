const { retrieveJsonData } = require('../../../src/loadJsonData');

const jsonFilePath = "test/components/info2/info2.json";
const jsonApiUrl = null;

module.exports = new Promise(async (resolve) => {
  let jsonData = await retrieveJsonData(jsonFilePath, jsonApiUrl);
  resolve (jsonData);
});
