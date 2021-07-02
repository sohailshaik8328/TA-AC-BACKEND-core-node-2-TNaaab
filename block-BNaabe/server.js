let path = require("path");

let serverPath = __filename;
console.log(serverPath);

let indexPath = __dirname;
console.log(indexPath);

let modulePathIndex = path.join(__dirname, __filename);
console.log(modulePathIndex);