const http = require('http');
const app = require('./app');
const socketIO = require('socket.io');

const port = process.env.PORT || 3005;

const server = http.createServer(app);
const io = socketIO(server);


io.on('connection', (socket) => {
    //io.emit('cool msg');
    console.log('hi from socket, connected');

    socket.on('disconnect', () => {
        //io.emit('user disconnected');
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log('listening on port ' + port);
});