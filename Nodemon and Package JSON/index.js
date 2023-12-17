const http = require("node:http");

const myServer = http.createServer((req,res) => {
    res.end("Kickstarting Node.js");
});

myServer.listen(7000, () => {
    console.log("Server started at port no 7000");
});