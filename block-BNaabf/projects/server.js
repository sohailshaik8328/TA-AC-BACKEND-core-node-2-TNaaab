let http = require("http");
let fs = require("fs");

let server = http.createServer(handleServer);

function handleServer(req, res) {
    let store = fs.createReadStream("./form.html").pipe(res);
   req.on("data", (chunk) => {
    store += chunk;
   }).on("end", () => {
    if(req.method === "GET" && req.url === "/form") {
        res.setHeader("Content-Type", "text/html");
        res.end(store);
    }
   })
}

server.listen(5678, () => {
    console.log("Server is listening on port 5678")
})