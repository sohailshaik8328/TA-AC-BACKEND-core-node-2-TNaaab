let http = require("http");
let qs = require("querystring");

let server = http.createServer(handleServer);

// function handleServer(req, res) {
//     let store = "";
//     req.on("data", (chunk) => {
//         store += chunk;
//     })

//     req.on("end", () => {
//         if(req.method === "POST" && req.url === "/json") {
//             res.writeHead(201, {"Content-Type": "application/json"});
//             res.end(store);
//         }

//         if(req.method === "POST" && req.url === "/form") {
//             res.writeHead(201, {"Content-Type": "x-www-form-urlencoded"});
//             let formData = qs.parse(JSON.stringify(store))
//             res.end(store);
//         }
//     })
// }


function handleServer(req, res) {
    var formatData = req.headers['content-type'];
    console.log(formatData)
    var store = "";
    req.on("data", (chunk) => {
        store += chunk;
    })
    req.on("end", () => {
        if(req.method === "POST" && req.url === "/json" && formatData==="application/json") {
            res.end(store);
        }
        if(req.method === "POST" && req.url === "/form" && formatData==="application/x-www-form-urlencoded") {
            let formData = qs.parse(store)
            console.log(formData)
            res.setHeader('Content-Type','text/html')
            res.end(`<h1>${formData.name}</h1>`);
        }
    })
}


server.listen(3000)