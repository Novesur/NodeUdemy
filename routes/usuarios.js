const {Router} = require('express');
const { check } = require('express-validator');
const { esRolValido, emailExiste, USerExisteById } = require('../helpers/db-validators');

const {validarCampos }= require('../middlewares/validar-campos')
const { usuariosGet, 
        usuariosPut,
        usuariosPost, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

  router.put('/:id',[
    check('id','No es un Id permitido').isMongoId(),
    check('id').custom(USerExisteById),
    validarCampos
  ], usuariosPut);
  router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener minimo 6 digitos').isLength({min:6}),
   // check('correo','El correo no es valido').isEmail(),
   check('correo').custom(emailExiste),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
  ], usuariosPost );

  
  router.delete('/', usuariosDelete)


module.exports = router;