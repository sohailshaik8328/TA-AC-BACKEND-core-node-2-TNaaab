let http = require("http");
let server = http.createServer(handleServer);
function handleServer(req, res) {
    let storeData = "";
    req.on("data", (chunk) => {
        storeData += chunk;
    })

    req.on("end", () => {
        console.log(storeData);
    })
}

server.listen(3456);