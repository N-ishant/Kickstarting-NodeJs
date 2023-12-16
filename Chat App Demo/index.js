const http = require("node:http");
const fs = require("node:fs");
const form = fs.readFileSync('./app.html' , "utf-8");

const server = http.createServer((req,res) => {
    const pathName = req.url;
    const method = req.method;
    if(pathName === '/') {
        fs.readFile("message.txt" , {encoding : "utf-8"} , (error, data) => {
            if(error){
                console.log(error);
            }
            console.log("Data from file : " + data);
            res.writeHead(200 , {"Content-Type":"text/html"});
            res.write(`${data}`);
            return res.end(form);
        }); 
    }else if(pathName === '/message' && method === 'POST') {
        const messageList = []; // array
        req.on('data' , (chunk) => {
            messageList.push(chunk);
        });
        return req.on('end' , () => {
            const parsedBody = Buffer.concat(messageList).toString();
            const messageData = parsedBody.split('=')[1]  // ['message'(array's 0th index) , 'Hello World'(array's 1st index)]
            fs.writeFile('message.txt' , messageData , {encoding : 'utf-8'} , (err) => {
                if(err){
                    console.log(err);
                }
                res.writeHead(302, {'Location' : '/'});
                return res.end();
            });
        });
    };
});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});