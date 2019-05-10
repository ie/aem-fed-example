const fs = require('fs'),
  jsOutputDir = './jsoutput',
  generatedHtmlDir = './generated_html',

  initFolders = () => {
    if (!fs.existsSync(jsOutputDir)) {
      fs.mkdirSync(jsOutputDir);
    }

    if (!fs.existsSync(generatedHtmlDir)) {
      fs.mkdirSync(generatedHtmlDir);
    }
  };

module.exports = initFolders;


