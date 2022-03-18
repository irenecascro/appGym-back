const { executeQuery, executeQueryOne } = require("../helpers")

/**
 * Recupera todos los profesores de la base de datos
 * @returns Promise<any[]> array con todos los profesores
 */
const getAll = () => {
    return executeQuery('select * from profesores');
}

/**
 * Inserta un nuevo profesor en la Base de datos
 * @param {Object} body datos para crear el nuevo profesor
 * @returns {Object} el resultado de la inserción
 */
const create = ({ nombre, experiencia }) => {
    return executeQuery('insert into profesores (nombre, experiencia) values (?, ?)', [nombre, experiencia]);
}

const updateById = (profesorId, { nombre, experiencia }) => {
    return executeQuery('update profesores set nombre = ?, experiencia = ? where id = ?', [nombre, experiencia, profesorId]);
}

const deleteById = (profesorId) => {
    return executeQuery('delete from profesores where id = ?', [profesorId]);
}

const getById = (profesorId) => {
    return executeQueryOne('select * from profesores where id = ?', [profesorId]);
}

module.exports = { getAll, create, updateById, deleteById, getById }