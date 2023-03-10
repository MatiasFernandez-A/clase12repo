import express from "express";
import __dirname from "./util.js";
import hadlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";


/* IMPORT NUEVO, este server se creara a partir del server HTTP */
import { Server } from "socket.io"; 

const app = express(); 
// Solo el server HTTP
const httpServer = app.listen("8080", ()=>{
    console.log("Escuchando en el puerto 8080");
})

/* Ahora algo nuevo 
Creamos un servidor para sockets viviendo dentro de nuestro servidor principal
*/
const socketServer = new Server(httpServer);// socketServer sera un servidor para trabajar con sockets

// Configuracio relacionada con plantillas 
app.engine("handlebars", hadlebars.engine());
app.set("views", __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));

app.use('/', viewsRouter);

/* 
    Usando socketServer.on para escuchar la conexion de un nuevo socket. Una vez que este se conecte, se puede reconocer y tomar alguna accion a partir de ello.
*/

let messages = []; 

socketServer.on("connection", socket=>{
    console.log("nuevo cliente conectado ");
    socket.on("menssage", data=>{
        console.log(data);
        messages.push(data); 
        socketServer.emit("messageLogs", messages);//[{user: Juan, message: "Hola"},{user: Julian, message: "Hola"}]
    })
})


