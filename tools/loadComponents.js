// built-in modules
const path = require('path');

// Use global to allow hot reloading to also rebuild components
global.fullObj;

// declared dependencies
const fse = require('fs-extra'),
  srcComponentsFolder = './test/components/',  // Define src folders - should move to .env file
  { asyncForEach } = require('./helpers'),

  loadComponents = async () => {

    return new Promise ((resolve) => {

      // Make sure to load components only once
      if (typeof global.fullObj !== 'undefined') {
        return resolve (global.fullObj);
      }

      global.fullObj = {};

      fse.readdir(srcComponentsFolder, async (err, files) => {
        if (err) {
          console.error('Could not list the directory.', err);
          process.exit(1);
        }
        // Loop through all components
        await asyncForEach(files, async (file) => {
          let filepath = path.join(srcComponentsFolder, file),
            stat = fse.statSync(filepath);
          if (stat.isFile()) {
            // console.log("'%s' is a file and will be skipped because it should be in a folder.", filepath);
          }
          else if (stat.isDirectory()) {
            await runThroughAllComponentDirs(file);
          }
        });
        resolve (global.fullObj);
      });
    });

  },

  runThroughAllComponentDirs = async (file) => {
    let innerDirectory = srcComponentsFolder + '/' + file + '/dev/',
      filesInner = fse.readdirSync(innerDirectory);
    await asyncForEach(filesInner, async (fileInner) => {
      global.fullObj = await loadInComponentFile (innerDirectory, fileInner);
    });
  },

  loadInComponentFile = async (innerDirectory, fileInner) => {
    let filename = path.join(innerDirectory, fileInner),
      stat = fse.statSync(filename);
    if (stat.isFile()) {
      if (fileInner.endsWith('.data.js')) {
        console.log("'%s' is a component to be processed.", filename);
        const nameOfFile = path.basename(filename, '.data.js');
        delete require.cache[require.resolve(path.normalize(__dirname + '/../' + filename))];
        let resource = require(path.normalize(__dirname + '/../' + filename));
        global.fullObj[nameOfFile] = await resource;
      }
    }
    return global.fullObj;
  };

module.exports = loadComponents;
