const exp = require('constants');
const express = require('express');
const app = express();
const http = require('http');
const { Socket } = require('socket.io');
const server = http.createServer(app);
const PORT = 3000
let name;
server.listen(3000, () => {
    console.log(`Listining on port ${PORT}`)
});
app.use(express.static(__dirname + '/public'))
app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/front.html')
});
 //socket
 const io = require('socket.io')(server);

io.on('connection',(Socket)=>{
    console.log(`new user connected.....`)
    Socket.on('disconnect', ()=>{
        console.log('user disconnected')});
        Socket.on('msg',(msg)=>{
            Socket.broadcast.emit('message',msg)
            console.log(msg)
        })
});

