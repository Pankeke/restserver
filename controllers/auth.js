const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require('../models/usuario_db');
const { generarJWT } = require("../helpers/generarJWT");

const login = async(req = require,res = response) => {

    const {correo,password} = req.body;

    try {

        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Constraseña no son correctos - correo'
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Constraseña no son correctos - estado false'
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Constraseña no son correctos - password false'
            });
        
        }


        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg : 'Ha ocurrido un error inesperado contacte al administrador'
        });
    }

    
}

module.exports = {
    login
}