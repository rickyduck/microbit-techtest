const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});
io.on('connection', socket => {
  console.log('a user connected');
  socket.on('message', message => {
    console.log('client is sending message  ', message);
    socket.emit('message', message);
  });
});
server.listen(4000, () => {
  console.log('The server is running: http://localhost:4000');
});
