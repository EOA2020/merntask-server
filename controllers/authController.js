const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.autenticarUsuario = async (req, res) =>{
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //extraer el email y password
    const { email, password } = req.body;

    try {
        // Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if(!usuario){
            return res.status(400).json({msg: 'El Usuario no existe!'});
        }

        //revisar su password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'Contraseña Incorrecta'});
        }

        //si todo es correcto, Crear y firmar el JWT
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
    }
}

//obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) =>{
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}