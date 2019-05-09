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

### To Setup

Install packages with Yarn

```bash
yarn install
```

### Development

Run Express and Webpack with Live Reload

```bash
yarn start
```
Go to http://localhost:3000/

### Production

```bash
yarn serve
```
Go to http://localhost:1234/

### TO DO

1. Adding SCSS support
1. Client libs
1. Hot reloading when files change
1. Resolve all eslint errors
1. Example BEM styling on a component
1. Add React to a component
1. Add Typescript support

### Resources

[HTL Specification and Syntax](https://github.com/adobe/htl-spec/blob/master/SPECIFICATION.md)