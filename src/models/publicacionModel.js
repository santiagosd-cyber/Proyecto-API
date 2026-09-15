const pool = require('../config/db');

const crearPublicacion = async (titulo, contenido, autor_id) => {
    const query = `INSERT INTO publicaciones (titulo, contenido, autor_id) VALUES (?, ?, ?)`;

    const [resultado] = await pool.query(query, [titulo, contenido, autor_id]);

    return resultado;
};

const obtenerTodas = async (search, limit, offset) => {
    let query = `SELECT * FROM publicaciones`;
    const values = [];

    if (search) {
        query += ` WHERE titulo LIKE ?`;
        values.push(`%${search}%`);
    }

    query += ` LIMIT ? OFFSET ?`;
    values.push(limit, offset);

    const [filas] = await pool.query(query, values);
    return filas;
};

const obtenerPorId = async (id) => {
    const query = `SELECT * FROM publicaciones WHERE id = ?`;
    const [filas] = await pool.query(query, [id]);
    return filas[0];
};

const actualizarPublicacion = async (id, titulo, contenido) => {
    const query = `UPDATE publicaciones SET titulo = ?, contenido = ? WHERE id = ?`;
    const [resultado] = await pool.query(query, [titulo, contenido, id]);
    return resultado;
};

const eliminarPublicacion = async (id) => {
    const query = `DELETE FROM publicaciones WHERE id = ?`;
    const [resultado] = await pool.query(query, [id]);
    return resultado;
};

module.exports = {
    crearPublicacion,
    obtenerTodas,
    obtenerPorId,
    actualizarPublicacion,
    eliminarPublicacion,
};