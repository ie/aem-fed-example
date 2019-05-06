# aem-fed-example

*Creating a means to separate AEM Back End Tech from Front End Development*

### About

This is currently a 1 to 1 file generator from HTL to HTML with only NodeJS

### Folder Structure

The structure expected is as follows

```bash
.
+-- components
|   +-- component-1 (put component htl and js together)
|   |   +-- component-1.htl 
|   |   +-- component-1.js
|   +-- component-2 (put component htl and js together)
|   |   +-- component-2.htl 
|   |   +-- component-2.js
+-- rawhtml (this is the full static html reference)
|   +-- html-1.spec.html
|   +-- html-2.spec.html
+-- specs (this is the JSON object files of full html pages)
|   +-- html-1.js
|   +-- html-2.js
+-- templates (this is the HTL version of the full html page)
|   +-- html-1.htl
|   +-- html-2.htl
```

### Components / Partials

Component HTL template is as follows:

Sample JSON: components/component-1/component-1.js:

~~~~
module.exports = {
  title: 'Information Component',
  description: 'Just some information'
};
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

Sample templates/html-1.js:

~~~~
const loadComponents = require('../../src/loadComponents');

let fullObj = {
    specific: "JSON specific to this component",
    ...
};

// Merge current object with other component objects
(async () => {
  await loadComponents(fullObj, function(fullObj) { 
    // console.log ("all component data", fullObj)
  });
})();

module.exports = fullObj;
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


### TO DO

Adding SCSS support

Client libs

Hot reloading when files change

Resolve all eslint errors