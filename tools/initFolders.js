const fs = require('fs');
const jsOutputDir = './jsoutput';
const generatedHtmlDir = './generated_html';

if (!fs.existsSync(jsOutputDir)){
    fs.mkdirSync(jsOutputDir);
}

if (!fs.existsSync(generatedHtmlDir)){
    fs.mkdirSync(generatedHtmlDir);
}