# aem-fed-example

*Creating a means to separate AEM Back End Tech from Front End Development*

### About

This is currently a 1 to 1 file generator from HTL to HTML with only NodeJS

To output files to deploy to AEM are in {test}/\
{test}/rawhtml is intended for testing and can be ignored in deployment

The starting point is to create HTL files in {test}/templates/\
For testing reference, place an intended outcome HTML version of the HTL file in {test}/rawhtml/\
When the script is run, the server will generate simulated deployment HTML files in generated_html/\
Comparing the {test}/rawhtml/ and generated_html/ can be used for testing

Create a component in components/ folder - see Folder Structure section

Link the component HTL to the main HTL in templates/ - see Components / Partials Basics

If there are any master scripts / styles that should be imported outside of AEM clientlibs, they should be placed in\
{test}/assets/ and loaded manually into the HTL template:\
- Add the file paths into tools/app.js 
- The generated compiled scripts / styles is available on public/app.js and public/app.css

If there are AEM clientlibs not specific to components, they should be placed in\
{test}/clientlib-src/.\
- Add the file paths into clientlib.config.js and link it to relevant components
- TODO: Master client libs need to be included in generated_html (see index.js parseEachHtl())

### Folder Structure

The structure expected is as follows

```
.
+-- assets (put master scripts here that dont belong to clientlibs)
|   +-- scripts (compiled to public/app.js)
|   +-- styles (compiled to public/app.css)
+-- clientlib-src (put any clientlib that is not component-specific here)
|   +-- css (compiled to components/**/clientlibs/css/*.css)
|   +-- js (compiled to components/**/clientlibs/js/*.js)
|   ...
+-- components
|   +-- component-1 (put component htl, scss, js and JSON together)
|   |   +-- clientlibs (automatically generated in build task) 
|   |   +-- dev 
|   |   |   +-- component-1.data.js 
|   |   |   +-- component-1.js
|   |   |   +-- component-1.json
|   |   |   +-- component-1.scss
|   |   +-- component-1.htl 
|   +-- react-component-1 (put component htl, scss, js and JSON together)
|   |   +-- clientlibs (automatically generated in build task) 
|   |   +-- dev 
|   |   |   +-- react-component-1.data.js 
|   |   |   +-- react-component-1.js (load normal JS and also use this to call React mount w/o JSX)
|   |   |   +-- react-component-1.json
|   |   |   +-- react-component-1.jsx (source of all React JSX for this component)
|   |   |   +-- react-component-1.scss
|   |   +-- react-component-1.htl 
+-- rawhtml (this is the full static html reference)
|   +-- html-1.spec.html
|   +-- html-2.spec.html
+-- specs (this is the JSON object logic of full html pages)
|   +-- html-1.data.js
|   +-- html-1.json
|   +-- html-2.data.js
|   +-- html-2.json
+-- templates (this is the HTL version of the full html page)
|   +-- html-1.htl
|   +-- html-2.htl
```

### Components / Partials Basics

Include any JS and SCSS in the format: 
- components/component-1/dev/component-1.js (import the component-1.scss here)
- components/component-1/dev/component-1.scss

Sample JSON loading in component - components/component-1/dev/component-1.data.js:

~~~~
const { retrieveJsonData } = require('../../../src/loadJsonData');

const jsonFilePath = "test/components/component-1/component-1.json";
const jsonApiUrl = null;

module.exports = new Promise(async (resolve) => {
  let jsonData = await retrieveJsonData(jsonFilePath, jsonApiUrl);
  resolve (jsonData);
});

~~~~

Sample component HTL - components/component-1/component-1.htl:

~~~~
<template data-sly-template.component-1="${@ component-1}">
    <h1>${component-1.title}</h1>
    <p>${component-1.description}</p>
</template>
~~~~
  
### React Component / Partials Loading

Sample loading React component - components/component-1/dev/component-1.js

~~~~
import mountReact from './component-1.jsx';
import component1DataJson from './component-1.json';

const devJson = true; // Move to .env file

if (devJson) {
  // Load JSON directly into props (recommended)
  mountReact(component1DataJson);
} else {
  // Rely on external API function to load into DOM, ie. React without external props
  mountReact(null);
}
~~~~

Sample React JSX of component - components/component-1/dev/component-1.jsx

~~~~
import React from 'react';
import ReactDOM from 'react-dom';
import './component-1.scss';

function Component1(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h4>From React: {props.title}</h4>
        <p>From React: {props.description}</p>
      </header>
    </div>
  );
}

function mountReact(props) {
  return ReactDOM.render(<Component1 {...props} />, document.getElementById('component1'));
}

export default mountReact;
~~~~

Sample React component HTL - components/component-1/component-1.htl:

~~~~
<template data-sly-template.component-1="${@ component-1}">
  <div id = 'component1'></div>
</template>
~~~~

### HTL Component / Partials Loading 

Sample Load JSON data into main HTL template - specs/html-1.data.js:

~~~~
const { extendJson, retrieveJsonData } = require('../../tools/loadJsonData');
const loadComponents = require('../../tools/loadComponents'),

  jsonFilePath = 'test/specs/html-1.json',
  jsonApiUrl = null;

module.exports = new Promise(async (resolve) => {
  let jsonData = await retrieveJsonData(jsonFilePath, jsonApiUrl),
    allComponentData = await loadComponents();
  resolve (extendJson (allComponentData, jsonData));
});
~~~~

Sample Load HTL component into main HTL template - templates/html-1.htl:

~~~~
<div id="load-component-component-1">
  <div data-sly-use.lib="./test/components/component-1/component-1.htl" data-sly-call="${lib.component-1 @ component-1=component-1}"></div>
</div>
~~~~

### To Setup

Install packages with Yarn

```bash
yarn install
```

### Development

Run Express and Webpack with Live Reload\
NOTE: there are 2 webpack configs running in parallel. Only yarn watch (webpack-front.config.js) will trigger a BrowserSync reload

```bash
yarn start
```
Go to http://localhost:3000/

### Production

Compile and minify all
```bash
yarn build
```

View currently generated html without linting and hot reloading (rebuilds to JSON changes)
```bash
yarn serve
```
Go to http://localhost:1234/

### Client Libs

All component JS and CSS (from SCSS) will automatically be linked in developer generated html if they follow the following format:

```bash
+-- components
|   +-- component-1 (put component htl, scss, js and JSON together)
|   |   +-- component-1.js
|   |   +-- component-1.scss
|   |   +-- ...
```

Client libs that are not part of components are to be stored in the folder clientlib-src/

Suggested folder structure:
```bash
+-- clientlib-src
|   +-- css
|   +-- js
|   +-- resources
|   ...
```

To generate the clientlib folder structure into each component
```bash
yarn clientlibs
```

Full settings for this script are to be modified via clientlib.config.js
Note that the generation of component clientlib folders need to be added manually, eg.
```bash
libs: [{
        name: "component-1",
        assets: {
            js: [
                "public/test/components/component-1/dev/component-1-js.js",
                ...
            ],
            css: [
                "public/test/components/component-1/dev/component-1-css.css",
                ...
            ]
        },
        ...
      }]
```   

#### Further work

Prior to shipping out HTL, we will need to strip out the START / END comments for the manual loads.

The manual integration has to be done because the client libs requires a special file which seems to be a file generated by AEM directly:
/libs/granite/sightly/templates/clientlib.html

Once set up, this should be the way to include the items to proceed further
https://gist.github.com/yupadhyay/a7348e7fbf98590f176c


### TO DO

1. Master client libs need to be included in generated_html (see index.js parseEachHtl())
2. Resolve all eslint errors
3. Example BEM styling on a component
4. Add Typescript support

### Resources

[HTL Specification and Syntax](https://github.com/adobe/htl-spec/blob/master/SPECIFICATION.md)