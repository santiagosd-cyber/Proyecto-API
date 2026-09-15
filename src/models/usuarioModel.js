const pool = require('../config/db');

const crearUsuario = async (nombre, email, passwordHasheada) => {

    const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';

    const [resultado] = await pool.query(query, [nombre, email, passwordHasheada]);

    return resultado;
};

const obtenerPorEmail = async (email) => {
    const query = 'SELECT * FROM usuarios WHERE email = ?';

    const [filas] = await pool.query(query, [email]);

    return filas[0];
};

const obtenerPorId = async (id) => {
    const query = 'SELECT id, nombre, email, rol, estado_id, fecha_creacion FROM usuarios WHERE id = ?';

    const [filas] = await pool.query(query, [id]);

    return filas[0];
};

module.exports = { crearUsuario, obtenerPorEmail, obtenerPorId };