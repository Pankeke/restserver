const express = require('express');
//const app = express();
const cors = require('cors');
const { dbConnection } = require('../database/config.js');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar a BD
        this.dataBaseConnection();

        //Middlewares
        this.middleWares();


        //Rutas de la aplicacion
        this.routes();
    }

    async dataBaseConnection(){
        await dbConnection();
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
        this.app.use(this.authPath, require('../routes/auth.js'));
        this.app.use(this.usuariosPath, require('../routes/usuarios.js'));
    }

    listener(){
        this.app.listen(this.port, () => {
            console.log("Escuchando en el puerto",this.port)
        });
    }
}

module.exports = Server;