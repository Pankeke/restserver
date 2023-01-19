const express = require('express');
//const app = express();
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middleWares();


        //Rutas de la aplicacion
        this.routes();
    }

    middleWares(){
        //cors
        this.app.use(cors());
        //Directorio publico
        this.app.use(express.static('public'));
        //Lectura y parseo del body
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios.js'));
    }

    listener(){
        this.app.listen(this.port, () => {
            console.log("Escuchando en el puerto",this.port)
        });
    }
}

module.exports = Server;
