let http = require("http");
let qs = require("querystring");

let server = http.createServer(handleServer);

function handleServer(req, res) {
    
    let store = "";
    req.on("data", (chunk) => {
        store += chunk;
    })

    req.on("end", () => {
        if(req.method === "POST" && req.url === "/json") {
            console.log(store);
            res.setHeader("Content-Type", "application/json")
            res.end(store);
        }

        if(req.method === "POST" && req.url === "/form") {
            res.setHeader("Content-Type", "x-www-form-urlencoded")
            res.end(store);
        }
    })

   
}

server.listen(7000, () => {
    console.log("Server is listening at port 7000")
})