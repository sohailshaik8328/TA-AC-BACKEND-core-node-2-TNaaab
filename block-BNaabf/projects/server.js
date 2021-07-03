let http = require("http");
let fs = require("fs");
let qs = require("querystring");

let server = http.createServer(handleServer);

function handleServer(req, res) {
    let store = "";
   req.on("data", (chunk) => {
    store += chunk;
   }).on("end", () => {
    if(req.method === "GET" && req.url === "/form") {
        fs.createReadStream("./form.html").pipe(res);
        res.setHeader("Content-Type", "text/html");
    }

    if(req.method === "POST" && req.url === "/form") {
        res.setHeader("Content-Type", "text/html");
        let formData = qs.parse(store);
        res.write(
            `<h2>${formData.name}</h2>
             <h2>${formData.email}</h2>
             <h2>${formData.age}</h2>`
        )
        res.end();
    }
   })
}

server.listen(5678, () => {
    console.log("Server is listening on port 5678")
})