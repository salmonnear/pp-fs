const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3005;

const server = http.createServer(app);

const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log('hi from socket, connected');
});

server.listen(port);