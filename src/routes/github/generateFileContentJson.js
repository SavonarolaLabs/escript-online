const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'app-template/dist');
const outputFilePath = path.join(__dirname, 'fileContent.json');

const getFileContent = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  return Buffer.from(content).toString('base64');
};

const walkDirectory = (dir) => {
  let files = [];
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      files = files.concat(walkDirectory(filePath));
    } else {
      files.push({
        path: path.relative(directoryPath, filePath).replace(/\\/g, '/'),
        content: getFileContent(filePath),
      });
    }
  });
  return files;
};

const fileContent = walkDirectory(directoryPath);
fs.writeFileSync(outputFilePath, JSON.stringify(fileContent, null, 2));
console.log('File content JSON generated successfully.');
