const { request, response } = require("express")

const esAdminRol = (req = request, res = response, next) =>{
    if (!req.usuario) {
        return res.status(500).json({
            msg : "Se intenta verificar rol sin verificar primero el token"
        });
    }
    const {rol,nombre}= req.usuario;

    if (rol !=='ADMIN_ROLE') {
        return res.status(401).json({
            msg : `${nombre} no es administrador - rol ${rol}`
        });
    }

    next();

}

const tieneRol = (...roles)=>{

    return (req,res=response, next)=>{
        
        if (!req.usuario) {
            return res.status(500).json({
                msg : "Se intenta verificar rol sin verificar primero el token"
            });
        }
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requere uno de estos roles ${roles}`
            });
        }
        next();
    }

}

module.exports = {
    esAdminRol,
    tieneRol
}