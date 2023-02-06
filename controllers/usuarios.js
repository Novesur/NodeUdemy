const { response } = require('express');

const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosPost = async (req, res) => {


  const { nombre, correo, password, rol } = req.body
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encryptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt)

  //Guardar en BD
  await usuario.save();
  res.status(201).json({
    msg: 'post API - controlador',
    usuario
  })
}

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google,correo, ...resto } = req.body;
  ///Validar contra Base de Datos
  if (password) {
    //Encryptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt)
  }
  const usuario  = await Usuario.findByIdAndUpdate(id, resto);

  res.status(500).json({
    msg: 'put API - controlador',
    usuario
  })
}

const usuariosGet = (req, res = response) => {
  const { q, nombre, apikey } = req.query;
  res.json({
    msg: 'get API - controlador',
    q,
    nombre,
    apikey,
  })
}




const usuariosDelete = (req, res) => {
  res.json({
    msg: 'delete API - controlador'
  })
}


module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
}