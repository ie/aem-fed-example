### About

This project is about creating a means to separate AEM Back End Tech from Front End Development

This is currently a 1 to 1 file generator from HTL to HTML with only NodeJS

The reference html file is meant to be stored in test/specs/*.spec.html

The JSON object will be stored in test/specs/*.js

The HTL file to edit is in test/templates/*.htl

### To Start

Need to create a symlink to the src folder

> ln -s node_modules/@adobe/htlengine/src

Then install packages with Yarn

> yarn install

### Express

Run Express in a separate terminal to be able to view the files in the browser

Debug mode

> npm run serve-debug

Production mode

> npm run serve

### To Run

Sample Run to generate html version of file simple.htl

> yarn start test/templates/simple.htl

The HTML file will then be available on

> http://localhost:3000/simple.html