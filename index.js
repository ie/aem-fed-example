/*
 * Copyright 2018 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// built-in modules
const path = require('path');
// declared dependencies
const fse = require('fs-extra');
// local modules
const engine = require('./tools/main'),
  { asyncForEach } = require('./tools/helpers'),
  initFolders = require('./tools/initFolders'),

  // Define src folders - should move to .env folder
  srcHTLFolder = './test/templates/',
  srcSpecFolder = './test/specs/',
  jsOutputFolder = './jsoutput/';

const { addCarriageReturn } = require('./tools/helpers');
const jsdom = require('jsdom'),
  { JSDOM } = jsdom,

  // Full HTL section

  executeHtlParser = async () => {

    initFolders();

    fse.readdir(srcHTLFolder, async (err, files) => {
      if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
      }
      await asyncForEach(files, async (file) => {

        // The reason to delete is to allow hot reloading to also rebuild components


        let filename = path.join(__dirname, srcHTLFolder, file),
          fileshorthtml = file.replace('.htl', '.html'),
          resourceFile = file.replace('.htl', '.data.js'),
          resourceFileFullPath = srcSpecFolder + resourceFile;

        delete require.cache[require.resolve(resourceFileFullPath)];
        const resource =  await require(resourceFileFullPath),
          template = await fse.readFile(filename, 'utf-8');
        fse.stat(filename, async (error, stat) => {

          if (error) {
            console.error('Error stating file.', error);
            process.exit(1);
          }

          if (stat.isFile()) {
            await parseEachHTl(filename, fileshorthtml, resource, template, resourceFile);
          }

          else if (stat.isDirectory())
          {console.log("'%s' is a directory to be skipped.", filename);}

        });
      });
    });

  },

  parseEachHTl = async (filename, fileshorthtml, resource, template, resourceFile) => {
    console.log("'%s' is a template to be processed.", filename);
    let ret = await engine(resource, template, resourceFile),
      dom = new JSDOM(ret.body);
    const filenameOut = path.resolve(process.cwd(), './generated_html/' + fileshorthtml);

    for (let componentName in global.fullObj) {

      // Only load the component if it has been called in the HTL
      const checkElement = dom.window.document.getElementById('load-component-' + componentName);
      if (checkElement === null) {
        continue;
      }

      dom = addCssToHead (dom, componentName);
      dom = addJsToBody (dom, componentName);
    }

    const modifiedBody = dom.serialize();

    fse.writeFile(filenameOut, modifiedBody, 'utf-8');

    // Remove generated javascript files
    fse.unlinkSync(jsOutputFolder + resourceFile);

  // Optional output html to console
  // console.log(ret.body);
  },

  addCssToHead = (dom, componentName) => {
    let style = dom.window.document.createElement('link');
    style.rel = 'stylesheet';
    style.href = '/test/components/' + componentName + '/dev/' + componentName + '.css';
    dom.window.document.head.appendChild(style);
    // Add line feed for easier reading
    dom.window.document = addCarriageReturn(dom.window.document, 'head');
    return dom;
  },

  addJsToBody = (dom, componentName) => {
    let script = dom.window.document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/test/components/' + componentName + '/dev/' + componentName + '.js';
    dom.window.document.body.appendChild(script);
    // Add line feed for easier reading
    dom.window.document = addCarriageReturn(dom.window.document, 'body');
    return dom;
  };

module.exports = executeHtlParser;

executeHtlParser();

