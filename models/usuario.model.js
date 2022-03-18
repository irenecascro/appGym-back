const { executeQuery, executeQueryOne } = require('../helpers');

const create = ({ nombre, username, email, password }) => {
    return executeQuery('insert into usuarios (nombre, username, email, password, role) values (?, ?, ?, ?, ?)', [nombre, username, email, password, 'regular']);
}

const getByEmail = (email) => {
    return executeQueryOne('select * from usuarios where email = ?', [email]);
}

const getById = (usuarioId) => {
    return executeQueryOne('select * from usuarios where id = ?', [usuarioId]);
}

module.exports = { create, getByEmail, getById };