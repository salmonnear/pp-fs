const http = require('http');
const app = require('./app');
const socketIO = require('socket.io');

const port = process.env.PORT || 3005;

const server = http.createServer(app);
const io = socketIO(server);


io.on('connection', (socket) => {
    console.log('hi from socket, connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.emit('test', {data: 'ok'});
});

server.listen(port, () => {
    console.log('listening on port ' + port);
});

module.exports = server, io;