const request = require('request');
const fse = require('fs-extra');

const retrieveDataFromLocal = async (url) => {
	return new Promise (function (resolve, reject) {
      fse.readFile(url, 'utf8', function (err,data) {
        if (err) {
            reject(err);
        }
        resolve(JSON.parse(data));
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

module.exports = { retrieveDataFromLocal, retrieveDataFromUrl } ;