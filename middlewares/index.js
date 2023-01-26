const validarCampos = require('../middlewares/validador');
const validarJWT  = require('../middlewares/validar-jwt');
const validaRoles  = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}