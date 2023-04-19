const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req, res) => {
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12)
    console.log(usuario)
    try {
        await usuario.save()
        res.json({ mensaje: 'Usuario creado exitosamente' })

    } catch (error) {
        console.log(error)
        req.json({ mensaje: 'Hubo un error al crear el usuario' })
    }

}

exports.autenticarUsuario = async (req, res, next) => {
    const { email, password } = req.body

    const usuario = await Usuarios.findOne({ email })

    if (!usuario) {
        await res.status(401).json({ mensaje: 'Este usuario no existe' })
        next();

    } else {
        if (!bcrypt.compareSync(password, usuario.password)) {
            await res.status(401).json({ mensaje: 'Password incorrecto' })
            next();
        }
        else{

            const token = jwt.sign({
                email:usuario.email,
                usuario:usuario.nombre,
                _id:usuario._id
            },'CRM',{
                expiresIn:'1h'
            })
            res.json({token})
        }
    }




}