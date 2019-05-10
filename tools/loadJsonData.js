const request = require('request');
const fse = require('fs-extra'),

  devJson = true, // Move to .env file

  extendJson = (obj, src) => {
    let objNew = Object.assign ({}, obj);
    Object.keys(src).forEach((key) => { objNew[key] = src[key]; });
    return objNew;
  },

  retrieveJsonData = async (jsonFilePath, jsonApiUrl) => {
    let dataJson;
    try {
      if (devJson) {
        dataJson = await retrieveDataFromLocal(__dirname + '/../' + jsonFilePath);
      } else {
        dataJson = await retrieveDataFromUrl(jsonApiUrl);
      }
    } catch (err) {
      dataJson = null;
    }
    return dataJson;
  },

  retrieveDataFromLocal = async (filePath) => {
    return new Promise ((resolve, reject) => {
      fse.readFile(filePath, 'utf8', (err,data) => {
        if (err) {
          return reject(err);
        }
        return resolve(JSON.parse(data));
      });
    });
  },


  retrieveDataFromUrl = async (url) => {
    return new Promise ((resolve, reject) => {
      request
        .get(url)
        .on('error', (err) => {
          reject(err);
        })
        .on('end', (data) => {
          resolve(data);
        });
    });
  };


module.exports = { extendJson, retrieveJsonData } ;
