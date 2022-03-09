const express = require("express");
//const socketio = require("socket.io");
const cors = require('cors');
const http = require("http");


const chatlist = require('./modules/chat/routes/chatlist.routes');
const chat = require('./modules/chat/routes/chatlist.routes');
const user = require('./modules/chat/routes/user.routes');
const login = require('./auth/routes/login.routes');

const app =  express();
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, x-access-token, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use('/api/chat', chat);
app.use('/api/chatlist', chatlist);
app.use('/api/user', user);
app.use('/api/', login);

const port = process.env.PORT || 3002;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Server is running on port ${port}..`));

// const io = socketio(server);
// io.on("connection", (socket) =>{
//     console.log("New connection");
   
// });