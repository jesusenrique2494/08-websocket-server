import express, { Application } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { socketController } from "../sockets/controller";
const app = express();

class ServerIo {
  private app: Application;
  private port: string;
  private apiPaths = {};
  private server: any;
  private io: Server;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
    this.server  = createServer(this.app);
    this.io = new Server(this.server);
    

    // metodos iniciales
    this.middlewares();
    this.routes();
  }
  

  middlewares() {
    // CORS

    this.app.use(cors());

    // lectura body
    this.app.use(express.json());

    // carpeta publica
    this.app.use(express.static('public'));

    //sockets
    this.sockets();
  }

  routes() {
  }
  
  sockets(){
    this.io.on("connection", socketController);
  }



  listen() {
    this.server.listen(this.port, () => {
      console.log("servidor corriendo en puerto ", this.port);
    });
  }
}

export default ServerIo;
