const {Router} = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioID } = require('../helpers/db-validators');
const {validarCampos} = require('../middlewares/validador');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioID),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.post('/',
    [   
        check('correo', 'Este correo no es valido').isEmail(),
        check('correo').custom(emailExiste),
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','La contraseña debe contener mas de 6 caracteres').isLength(6),
        //check('rol','No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom(esRolValido),
        validarCampos
    ],
    usuariosPost);

router.delete('/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioID),
        validarCampos
    ],
    usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;