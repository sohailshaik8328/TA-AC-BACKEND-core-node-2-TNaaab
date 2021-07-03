let fs = require("fs");
let http = require("http");
let path = require("path");
let url = require("url");
let qs = require('querystring');


let server = http.createServer(handleServer);

function handleServer(req, res) {
    var store = "";
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on("end", () => {
        // let parsedUrl = JSON.parse(req.url)
        // console.log(parsedUrl)
        if(req.url === "/users" && req.method === "POST") {
            var username = JSON.parse(store).username;
            fs.open(__dirname+'/users/'+ username + ".json", "wx", (err, fd) => {
                fs.writeFile(fd, store, (err) => {
                    fs.close(fd, (err) => {
                        res.end(`${username} successfully created`);
                    })
                })
            })
        }
    })

    if(req.url.pathname === "/users" && req.method === "GET") {
       let parsedUsername =  qs.parse(store).username;
       console.log(parsedUsername);
    //    fs.createReadStream( `${req.url}${parsedUsername}`).pipe(res);
    fs.readFile("./macha.json", (err, user) => {
        res.end(user)
    })
    }
}



server.listen(3000, () => {
    console.log("Server is listening ar port 3000")
})