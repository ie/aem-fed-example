# aem-fed-example

*Creating a means to separate AEM Back End Tech from Front End Development*

### About

This is currently a 1 to 1 file generator from HTL to HTML with only NodeJS

### Folder Structure

The structure expected is as follows

```bash
.
+-- components
|   +-- component-1 (put component htl, js and JSON together)
|   |   +-- component-1.htl 
|   |   +-- component-1.js
|   |   +-- component-1.json
|   +-- component-2 (put component htl, js and JSON together)
|   |   +-- component-2.htl 
|   |   +-- component-2.js
|   |   +-- component-2.json
+-- rawhtml (this is the full static html reference)
|   +-- html-1.spec.html
|   +-- html-2.spec.html
+-- specs (this is the JSON object logic of full html pages)
|   +-- html-1.js
|   +-- html-1.json
|   +-- html-2.js
|   +-- html-2.json
+-- templates (this is the HTL version of the full html page)
|   +-- html-1.htl
|   +-- html-2.htl
```

### Components / Partials

Component HTL template is as follows:

Sample JSON: components/component-1/component-1.js:

~~~~
const { retrieveJsonData } = require('../../../src/loadJsonData');

const jsonFilePath = "test/components/component-1/component-1.json";
const jsonApiUrl = null;

module.exports = new Promise(async (resolve) => {
  let jsonData = await retrieveJsonData(jsonFilePath, jsonApiUrl);
  resolve (jsonData);
});

~~~~

Sample HTL: components/component-1/component-1.htl:

~~~~
<template data-sly-template.component-1="${@ component-1}">
    <h1>${component-1.title}</h1>
    <p>${component-1.description}</p>
</template>
~~~~
  
### Component / Partials Loading

When there is a need to use components, use loadComponents to load all components within the components/ folder

Sample templates/html-1.htl:

~~~~
<div data-sly-use.lib="./test/components/component-1/component-1.htl" data-sly-call="${lib.component-1 @ component-1=component-1}"></div>
~~~~

Sample specs/html-1.js:

~~~~
const { extendJson, retrieveJsonData } = require('../../src/loadJsonData');
const loadComponents = require('../../src/loadComponents');

const jsonFilePath = "test/specs//html-1.json";
const jsonApiUrl = null;

module.exports = new Promise(async (resolve) => {
  let jsonData = await retrieveJsonData(jsonFilePath, jsonApiUrl);
  let allComponentData = await loadComponents();
  resolve (extendJson (allComponentData, jsonData));
});
~~~~

### To Start

Install packages with Yarn

```bash
yarn install
```

Set up folders required (or can manually create generated_html/ and jsoutput/)

```bash
yarn init-folders
```

### Express

Run Express in a separate terminal to be able to view the files in the browser

Debug mode

```bash
npm run serve-debug
```

Production mode

```bash
npm run serve
```

### To Run

Sample Run to generate html versions

```bash
yarn start
```

The HTML file will then be available on the local server, eg.

http://localhost:3000/simple.html

### Client Libs

This should be the way to include the items

https://gist.github.com/yupadhyay/a7348e7fbf98590f176c

The file /libs/granite/sightly/templates/clientlib.html is missing

### TO DO

Adding SCSS support

Client libs

Hot reloading when files change

Resolve all eslint errors