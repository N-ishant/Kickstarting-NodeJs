const fs = require("node:fs");
const form = fs.readFileSync('./app.html' , "utf-8");

const requestHandler = (req,res) => {
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
        const messageList = [];
        req.on('data' , (chunk) => {
            messageList.push(chunk);
        });
        return req.on('end' , () => {
            const parsedBody = Buffer.concat(messageList).toString();
            const messageData = parsedBody.split('=')[1];
            fs.writeFile('message.txt' , messageData , {encoding : 'utf8'} , (err) => {
                if(err){
                    console.log(err);
                }
                res.writeHead(302, {'Location' : '/'});
                return res.end();
            });
        });
    };
};

module.exports = requestHandler;