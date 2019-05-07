// built-in modules
const path = require('path');
// declared dependencies
const fse = require('fs-extra');

// Define src folders - should move to .env file
const srcComponentsFolder = './test/components/';

// Convert foreach to async
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

let fullObj;

const loadComponents = async () => {

    return new Promise (function (resolve, reject) {

        // Make sure to load components only once
        if (typeof fullObj !== 'undefined') {
            return resolve (fullObj);
        }

        fullObj = {};
        
        fse.readdir(srcComponentsFolder, async (err, files) => {
            if (err) {
              console.error("Could not list the directory.", err);
              process.exit(1);
            }
            // Loop through all components 
            await asyncForEach(files, async (file, index) => {
                let filename = path.join(srcComponentsFolder, file);
                let stat = fse.statSync(filename);
                if (stat.isFile()) {
                    console.log("'%s' is a file and will be skipped because it should be in a folder.", filename);  
                }
                else if (stat.isDirectory()) {
                    await runThroughAllComponentDirs(file);
                }
            });
            resolve (fullObj);
        });
    });   

};

const runThroughAllComponentDirs = async (file) => {
      // console.log("'%s' is a component directory.", filename);  
      let innerDirectory = srcComponentsFolder + "/" + file + "/";
      let filesInner = fse.readdirSync(innerDirectory);
      await asyncForEach(filesInner, async (fileInner, index) => {
          fullObj = loadInComponentFile (innerDirectory, fileInner);
      });
}

const loadInComponentFile = (innerDirectory, fileInner) => {
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
    return fullObj;
};

module.exports = loadComponents;