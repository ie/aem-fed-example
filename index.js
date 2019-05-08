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

  // Define src folders - should move to .env folder
  srcHTLFolder = './test/templates/',
  srcSpecFolder = './test/specs/',
  jsOutputFolder = './jsoutput/';

const { asyncForEach } = require('./tools/helpers');

// Full HTL section

(async () => {

  fse.readdir(srcHTLFolder, async function (err, files) {
    if (err) {
      console.error('Could not list the directory.', err);
      process.exit(1);
    }

    await asyncForEach(files, async (file, index) => {
      let filename = path.join(srcHTLFolder, file),

        // Previous implementation from Node CLI
        // const filename = process.argv[2];

        // New implementation which loops through the test folder
        fileshort = filename.substring(filename.lastIndexOf('/') + 1),
        fileshorthtml = fileshort.replace('.htl', '.html'),
        resourceFile = fileshorthtml.replace('.html', '.js'),
        resource = await require(srcSpecFolder + resourceFile);


      template = await fse.readFile(filename, 'utf-8');

      fse.stat(filename, async function (error, stat) {
        if (error) {
          console.error('Error stating file.', error);
          return;
        }

        if (stat.isFile()) {
          console.log("'%s' is a file to be processed.", filename);

          let ret = await engine(resource, template, resourceFile);

          const filenameOut = path.resolve(process.cwd(), './generated_html/' + fileshorthtml);
          fse.writeFile(filenameOut, ret.body, 'utf-8');

          // Remove generated javascript files
          fse.unlinkSync(jsOutputFolder + resourceFile);

          // Optional output html to console
          // console.log(ret.body);

        }

        else if (stat.isDirectory())
        {console.log("'%s' is a directory to be skipped.", filename);}

      });
    });
  });

})();

