import express from 'express';
import http from 'http'
import { Server } from 'socket.io';
import path from 'path';
import connConfig from './config/conn.config.js';
import userRoute from './routes/user.route.js'
import requestRoute from './routes/request.route.js'
import dotenev from 'dotenv';
dotenev.config()
const app = express();
const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
    socket.on("user-message",(message)=>{  //agar frontend se koi message aata h 
        io.emit("message",message) //usko sbhi ko dedo
    })
})
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("./public/index.html");
})

app.use('/user',userRoute);
app.use('/request',requestRoute);


// Start the server
connConfig.connection();
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});