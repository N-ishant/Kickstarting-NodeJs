const http = require("node:http");
const routes = require("./routes");

const server = http.createServer(routes);

server.listen(5000, () => {
    console.log("Server running on port 5000");
});