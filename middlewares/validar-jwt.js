const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario_db');

const validarJWT = async(req = request, res = response,next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        });
        
    }

    try {
        
        const {uid} = jwt.verify(token,process.env.SECRETKEY);
        //Leer usuario correspondiente al uid
        const usuario = await Usuario.findById(uid);
        //Verificar si el usuario existe
        if (!usuario) {
            return res.status(401).json({
                msg: "Token no valido - Usuario no existe"
            });
        }

        //Veritifcar si el uid está activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Token no valido - Usuario inactivo FALSE"
            });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no valido"
        });
    }

}


module.exports = {
    validarJWT
}