let path = require("path");

let indexJSrelativePath = ("./index.js");
console.log(indexJSrelativePath);

let absolutePathIndexJS = path.join(__dirname, "../client/index.js");
console.log(absolutePathIndexJS);


