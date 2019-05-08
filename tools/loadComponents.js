// built-in modules
const path = require('path');
// declared dependencies
const fse = require('fs-extra');

// Define src folders - should move to .env file
const srcComponentsFolder = './test/components/';

const { asyncForEach } = require('./helpers');

// Use global to allow hot reloading to also rebuild components
global.fullObj;

const loadComponents = async () => {

    return new Promise (function (resolve, reject) {

        // Make sure to load components only once
        if (typeof global.fullObj !== 'undefined') {
            return resolve (global.fullObj);
        }

        global.fullObj = {};
        
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
            resolve (global.fullObj);
        });
    });   

};

const runThroughAllComponentDirs = async (file) => {
      // console.log("'%s' is a component directory.", filename);  
      let innerDirectory = srcComponentsFolder + "/" + file + "/";
      let filesInner = fse.readdirSync(innerDirectory);
      await asyncForEach(filesInner, async (fileInner, index) => {
        global.fullObj = await loadInComponentFile (innerDirectory, fileInner);
      });
}

const loadInComponentFile = async (innerDirectory, fileInner) => {
    let filename = path.join(innerDirectory, fileInner);
    let fileshort = filename.substring(filename.lastIndexOf('/')+1);
    let stat = fse.statSync(filename);

    if (stat.isFile()) {
        if (path.extname(fileshort) === ".js") {
            console.log("'%s' is a component to be processed.", filename);
            const nameOfFile = path.basename(fileshort, ".js");
            let resource = require("../" + innerDirectory + fileshort);
            fullObj[nameOfFile] = await resource;
        }
    }
    return fullObj;
};

module.exports = loadComponents;