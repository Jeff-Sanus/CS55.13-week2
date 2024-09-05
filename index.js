const http = require("http");
const fs = require("fs").promises;

const requestListener = function (req, res) {
    console.log(req.url);

    if (req.url === "/") {
        // Serve the HTML page
        fs.readFile(__dirname + "/page.html")
            .then((contents) => {
                res.setHeader("Content-Type", "text/html; charset=UTF-8");
                res.writeHead(200);
                res.end(contents);
            })
            .catch((err) => {
                res.writeHead(500);
                res.end("Error loading HTML page");
                console.error(err);
            });
    } else if (req.url === "/data.json") {
        // Serve the JSON file
        fs.readFile(__dirname + "/data.json")
            .then((contents) => {
                res.setHeader("Content-Type", "application/json; charset=UTF-8");
                res.writeHead(200);
                res.end(contents);
            })
            .catch((err) => {
                res.writeHead(500);
                res.end("Error loading JSON data");
                console.error(err);
            });
    } else {
        // Serve JSON data for any other request
        const data = [
            {
                firstname: "Fred",
                link: "https://www.santarosa.edu",
            },
            {
                firstname: "Jane",
                link: "https://www.apple.com",
            },
            {
                firstname: "Mary",
                link: "https://www.w3schools.com",
            },
        ];

        res.setHeader("Content-Type", "application/json; charset=UTF-8");
        res.writeHead(200);
        res.end(JSON.stringify(data));
    }
};

const server = http.createServer(requestListener);

const host = "127.0.0.1";
const port = 3000;

server.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});