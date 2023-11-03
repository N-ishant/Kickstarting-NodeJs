const http = require('http');

const server = http.createServer((req,res) => {
    res.end("Nishant Upreti");
});    

server.listen(4000, () => {
    console.log("Server started at port no 4000");
})