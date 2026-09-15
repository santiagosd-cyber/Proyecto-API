const publicacionModel = require('../models/publicacionModel');

const crearPost = async (req, res) => {
    try {
        const { titulo, contenido } = req.body;

        const autor_id = req.usuario.id;

        const resultado = await publicacionModel.crearPublicacion(titulo, contenido, autor_id);

        res.status(201).json({
            mensaje: 'Publicación creada.',
            id: resultado.insertId,
        });
    } catch (error) {
        console.error('[ERROR]:', error);
        res.status(500).json({ error: 'Error en servidor.' });
    }
};

const listarPublicaciones = async (req, res) => {
    try {
        
        const { search, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * Number(limit);
        const publicaciones = await publicacionModel.obtenerTodas(search, Number(limit), offset);
        res.json(publicaciones);
    } catch (error) {
        console.error('[ERROR]:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const actualizarPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, contenido } = req.body;

        const post = await publicacionModel.obtenerPorId(id);

        if (!post) {
            return res.status(404).json({ error: 'Publicación no encontrada.' });
        }
        if (post.autor_id !== req.usuario.id) {
            return res.status(403).json({ error: 'Forbidden: No eres el dueño.' });
        }
        await publicacionModel.actualizarPublicacion(id, titulo, contenido);
        res.status(200).json({ mensaje: 'Publicación actualizada.' });
    } catch (error) {
        console.error('[ERROR]:', error);
        res.status(500).json({ error: 'Error en servidor.' });
    }
};

const eliminarPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await publicacionModel.obtenerPorId(id);
        if (!post) {
            return res.status(404).json({ error: 'Publicación no encontrada.' });
        }
        if (post.autor_id !== req.usuario.id) {
            return res.status(403).json({ error: 'Forbidden: No eres el dueño.' });
        }
        await publicacionModel.eliminarPublicacion(id);
        res.status(200).json({ mensaje: 'Publicación eliminada.' });
    } catch (error) {
        console.error('[ERROR]:', error);
        res.status(500).json({ error: 'Error en servidor.' });
    }
};

module.exports = { crearPost, listarPublicaciones, actualizarPost, eliminarPost };