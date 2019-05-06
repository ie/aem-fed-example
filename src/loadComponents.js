// built-in modules
const path = require('path');
// declared dependencies
const fse = require('fs-extra');

const devJson = true; // Move to .env file

const { retrieveDataFromLocal, retrieveDataFromUrl } = require('./loadJsonData');

// Define src folders - should move to .env file
const srcComponentsFolder = './test/components/';

const loadComponents = async (fullObj, callback) => {
    fse.readdir(srcComponentsFolder, function (err, files) {
        if (err) {
          console.error("Could not list the directory.", err);
          process.exit(1);
        }
        // Loop through all components 
        files.forEach(function (file, index) {
            let filename = path.join(srcComponentsFolder, file);

            let stat = fse.statSync(filename);

            if (stat.isFile()) {
                console.log("'%s' is a file and will be skipped because it should be in a folder.", filename);  
            }

            else if (stat.isDirectory()) {
                // console.log("'%s' is a component directory.", filename);  
                let innerDirectory = srcComponentsFolder + "/" + file + "/";
                let filesInner = fse.readdirSync(innerDirectory);
                filesInner.forEach(function (fileInner, index) {
                    let filename = path.join(innerDirectory, fileInner);
                    let fileshort = filename.substring(filename.lastIndexOf('/')+1);
        
                    let stat = fse.statSync(filename);
        
                    if (stat.isFile()) {
                        if (path.extname(fileshort) === ".js") {
                            console.log("'%s' is a component to be processed.", filename);
                            const nameOfFile = path.basename(fileshort, ".js");
                            let resource = require("../" + innerDirectory + fileshort);
                            fullObj[nameOfFile] = resource;
                        }
                    }
                });
            }

        });

        callback(fullObj);    
    });
}

module.exports = function (jsonFilePath, jsonApiUrl) {
    return new Promise(function(resolve){
        (async () => {
            let dataJson;
            try {
                if (devJson) {
                    dataJson = await retrieveDataFromLocal(__dirname + "/../" + jsonFilePath);
                } else {
                    dataJson = await retrieveDataFromUrl(jsonApiUrl);
                }
            } catch (err) {
                dataJson = null;
            }
            await loadComponents(dataJson, function(combinedFullObj) { 
                // console.log ("all component data merged with current page data", combinedFullObj);
                resolve(combinedFullObj);
            });
        })();
    })
};