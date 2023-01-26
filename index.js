const app = require('./app');
const http = require('http');

const server = http.createServer(app);

server.listen(process.env.PORT || 8080, "0.0.0.0", () => {
    console.log(`Server running on port ${process.env.PORT || 8080}`);
});