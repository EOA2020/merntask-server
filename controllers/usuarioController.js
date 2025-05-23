const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) =>{
    
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    const { email, password } = req.body;
    
    try {
        //revisar que el usuario sea unico
        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).json({ msg: 'El usuario ya existe'});
        }

        //crea el nuevo usuario
        usuario = new Usuario(req.body);

        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //guardar usuario
        await usuario.save();

        //Crear y firmar el JWT
        const payload = {
            usuario:{
                id: usuario._id.toString() 
            }
        };

        //firmar JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 10800 //3 hora
        }, (error, token) =>{
            if(error) throw error;
            res.json({token});
        });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}