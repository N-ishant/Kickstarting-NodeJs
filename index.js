// HTTP Routing
const http = require("node:http");

const server = http.createServer((req,res) => {
    switch(req.url) {
        case '/home' : res.writeHead(200 , {"Content-Type" : "text/plain"});
                       res.end("Welcome Home");
        break;
        case '/about' : res.writeHead(200 , {"Content-Type" : "text/plain"});
                        res.end("Welcome to About Us page");
        break;
        case '/node' : res.writeHead(200 , {"Content-Type" : "text/plain"});
                       res.end("Welcome to my Node Js project"); 
        break;
        default :  res.writeHead(404 , {"Content-Type" : "text/plain"});  
                   res.end("Page not found");                  
    }
})

server.listen(4005 , () => {
    console.log("Server running on port 4005");
})