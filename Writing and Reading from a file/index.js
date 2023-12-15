const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req,res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.writeHead(200 , {"Content-Type":"text/html"});
        const html = fs.readFileSync('./app.html' , "utf-8");
        return res.end(html);
    }else if(url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt' , 'Hello World!');
        res.writeHead(302, {'Location' : '/'});
        // res.statusCode = 302;
        // res.setHeader('Location' , '/');
        return res.end();
    }
    res.writeHead(200 , {"Content-Type":"text/html"});
    const html = fs.readFileSync('./hey.html' , "utf-8");
    res.end(html);     
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});