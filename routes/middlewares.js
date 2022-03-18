const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const usuarioModel = require('../models/usuario.model');

const checkToken = async (req, res, next) => {
    // 1 - Comprobar si el token viene incluido en las cabeceras
    if (!req.headers.authorization) {
        return res.json({ error: 'Debes incluir la cabecera Authorization' });
    }

    // 2 - Comprobar si el token es correcto
    const token = req.headers.authorization;

    let obj;
    try {
        obj = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        return res.json({ error: 'El token es incorrecto' });
    }

    // 3 - Comprobar la expiración del token
    console.log(obj);
    //obj = { usuario_id, fecha_expiracion, iat }
    if (dayjs().unix() > obj.fecha_expiracion) {
        return res.json({ error: 'El token está caducado' });
    }

    // Usuario tiene autorización dentro de la API
    const usuario = await usuarioModel.getById(obj.usuario_id);
    req.user = usuario;

    next();
}

const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role === role) {
            next();
        } else {
            res.json({ error: 'No estás autorizado' });
        }
    }
}

module.exports = { checkToken, checkRole };