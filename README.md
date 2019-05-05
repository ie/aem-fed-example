# aem-fed-example

*Creating a means to separate AEM Back End Tech from Front End Development*

### About

This is currently a 1 to 1 file generator from HTL to HTML with only NodeJS

The reference html file is meant to be stored in test/rawhtml/*.spec.html

The JSON object will be stored in test/specs/*.js

The HTL file to edit is in test/templates/*.htl

### To Start

Install packages with Yarn

```bash
yarn install
```

Set up folders required

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

Embed htl partials

Adding SCSS support

Client libs

Hot reloading when files change

Resolve all eslint errors