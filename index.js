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
const engine = require('./src/main');

const resourceSimple = require('./test/specs/simple');

(async () => {
  const filename = process.argv[2];
  const fileshort = filename.substring(filename.lastIndexOf('/')+1);
  const fileshorthtml = fileshort.replace(".htl", ".html");
  const template = await fse.readFile(filename, 'utf-8');

  const resource = resourceSimple;

  engine(resource, template).then((ret) => {
    // eslint-disable-next-line no-console
    
    const filenameOut = path.resolve(process.cwd(), './generated_html/' + fileshorthtml);
    fse.writeFile(filenameOut, ret.body, 'utf-8');

    // console.log(ret.body);

  });
})();
