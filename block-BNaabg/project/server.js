let fs = require("fs");
let http = require("http");
let path = require("path");
let url = require("url");
let qs = require('querystring');
let userPath = __dirname + "/users/";


let server = http.createServer(handleServer);

function handleServer(req, res) {
    var store = "";
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on("end", () => {
        var parsedUrl = url.parse(req.url, true);
        if(req.url === "/users" && req.method === "POST") {
            let username = JSON.parse(store).username;
            fs.open(userPath + username + ".json", "wx", (err, fd) => {
                if(err) return console.log(err);
                fs.writeFile(fd, store, (err) => {
                    if(err) return console.log(err);
                    fs.close(fd, (err) => {
                        res.end(`${username} successfully created`);
                    })
                })
            })
        }

        if(parsedUrl.pathname === "/users" && req.method === "GET") {
            let username = parsedUrl.query.username;
            fs.readFile(userPath + username + ".json", (err, content) => {
                if(err) return console.log(err);
                res.setHeader("Content-Type", "application/json");
                res.end(content)
            })            
        }

        if(parsedUrl.pathname === "/users" && req.method === "DELETE") {
            let username = parsedUrl.query.username;
            fs.unlink(userPath + username + ".json", (err) => {
                if(err) console.log(err);
                res.end();
            })
        }

        if(parsedUrl.pathname === "/users" && req.method === "PUT") {
            let username = parsedUrl.query.username;
            fs.open(userPath + username + ".json", "r+", (err, fd) => {
                if(err) console.log(err);
                fs.ftruncate(fd, () => {
                    fs.writeFile(fd, store, (err) => {
                        if(err) console.log(err);
                        fs.close(fd, (err) => {
                            if(err) console.log(err);
                            res.end(`${username} updated successfully`);
                        })
                    })
                })
            })
        }
    })
}



server.listen(3000, () => {
    console.log("Server is listening ar port 3000")
})