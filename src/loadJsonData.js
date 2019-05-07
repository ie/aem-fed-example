const request = require('request');
const fse = require('fs-extra');

const devJson = true; // Move to .env file

const extendJson = (obj, src) => {
    // Need to fix this bug where same object is being carried everywhere
    // let objNew = Object.assign ({}, obj);
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
}

const retrieveJsonData = async (jsonFilePath, jsonApiUrl) => {
    try {
        if (devJson) {
            dataJson = await retrieveDataFromLocal(__dirname + "/../" + jsonFilePath);
        } else {
            dataJson = await retrieveDataFromUrl(jsonApiUrl);
        }
    } catch (err) {
        dataJson = null;
    }
    return dataJson;
};

const retrieveDataFromLocal = async (filePath) => {
	return new Promise (function (resolve, reject) {
      fse.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
            return reject(err);
        }
        return resolve(JSON.parse(data));
      });
  });
}


const retrieveDataFromUrl = async (url) => {
	return new Promise (function (resolve, reject) {
	    request
        .get(url)
        .on('error', function(err) {
            reject(err);
        })
        .on('end', function(data) {
            resolve(data);
        })
    });
}


module.exports = { extendJson, retrieveJsonData } ;