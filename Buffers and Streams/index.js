const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req,res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.writeHead(200 , {"Content-Type":"text/html"});
        const form = fs.readFileSync('./app.html' , "utf-8");
        return res.end(form);
    }else if(url === '/message' && method === 'POST') {
        const body = []; // array
        req.on('data' , (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end' , () => {
            const parsedBody = Buffer.concat(body).toString();
            const messageData = parsedBody.split('=')[1]  // ['message' , 'Hello World']
            console.log(messageData);
            fs.writeFile('message.txt' , messageData , 'utf-8' , err => {
                res.writeHead(302, {'Location' : '/'});
                return res.end();
            });
        });
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});