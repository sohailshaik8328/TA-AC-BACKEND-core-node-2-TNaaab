let http = require("http");
let qs = require("querystring");

let server = http.createServer(handleServer);

function handleServer(req, res) {
    let dataFormat = req.headers["content-type"];
    let store = "";
    res.on("data", (chunk) => {
        store += chunk;
    })

    res.on("end", () => {
        if(dataFormat === "application/json") {
            var parsedData = JSON.parse(store);
            console.log(res.end(store));
        }

        if(dataFormat === "x-www-form-urlencoded") {
            var parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    })

   
}

server.listen(7000, () => {
    console.log("Server is listening at port 7000")
})