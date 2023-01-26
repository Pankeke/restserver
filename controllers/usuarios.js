const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario_db');


const usuariosGet = async(req = request,res = response)=>{

    const {limite=5,desde=0} = req.query;
    const query = {estado:true};

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async(req,res=response)=>{
    const {id} = req.params;
    const {_id, password,google,correo, ...resto} = req.body;

    //TODO Validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync(11); //ciclos de encriptacion
        resto.password = bcryptjs.hashSync(password, salt); //encriptacion
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
}

const usuariosPost = async(req,res)=>{

    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    //Verificar si existe el correo
    

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync(11); //ciclos de encriptacion
    usuario.password = bcryptjs.hashSync(password, salt); //encriptacion

    //Guardar en BD
    await usuario.save();

    res.json({
       // msg: 'post API - Controlador',
        usuario
    });
}

const usuariosDelete = async(req,res)=>{

    const {id} = req.params;
    

    //Borrar fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Borrar por actualizacion
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    
    

    res.json({
        usuario
    });
}

const usuariosPatch = (req,res)=>{
    res.json({
        msg: 'patch API - Controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}