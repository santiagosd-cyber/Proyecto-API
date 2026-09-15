const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');
const { passRegex } = require('../utils/validadores');

const registrar = async (req,res) => {
    try{
        const { nombre,email,password} = req.body;
        if (!passRegex.test(password)) {
            return res.status(400).json({
                error: 'La contraseña es demasiado débil.'
            });
        }
        const saltRounds = 10;
        const passwordHasheada = await bcrypt.hash(password, saltRounds);
        await usuarioModel.crearUsuario(nombre, email, passwordHasheada);
        res.status(201).json({
            mensaje: 'Usuario registrado.'
        });
    } catch (error) {
        console.error('[ERROR]:', error);
        res.status(500).json({
            error: 'Error en servidor.'
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await usuarioModel.obtenerPorEmail(email);
        if (!usuario) {
            return res.status(401).json({
                error: 'Credenciales inválidas.'
            });
        }
        const passValida = await bcrypt.compare(
            password,        
            usuario.password 
        );
        if (!passValida) {
            return res.status(401).json({
                error: 'Credenciales inválidas.'
            });
        }
        const payload = {
            id: usuario.id,
            rol: usuario.rol
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '2h' } 
        );
        res.status(200).json({ token });

    } catch (error) {
        console.error('[ERROR]:', error);
        res.status(500).json({
            error: 'Error en servidor.'
        });
    }
};

const verPerfil = async (req, res) => {
    try {
        const usuario = await usuarioModel.obtenerPorId(req.usuario.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error('[ERROR]:', error);
        res.status(500).json({
            error: 'Error en servidor.'
        });
    }
};

module.exports = { registrar, login, verPerfil };