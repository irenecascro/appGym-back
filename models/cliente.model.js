// Todas las sentencias SQL que vamos ejecutar sobre la tabla clientes
const { executeQuery, executeQueryOne } = require('../helpers');
const QueryManager = require('../QueryManager');

const getAll = (page, total) => {
    // const queryMg = new QueryManager('select * from clientes');
    // return queryMg.executeQuery();
    // return new QueryManager('select * from clientes').executeQuery();
    return executeQuery(
        'select * from clientes limit ? offset ?',
        [total, (page - 1) * total]
    );
}

const getById = (clienteId) => {
    return executeQueryOne('select * from clientes where id = ?', [clienteId]);
}

const getByEdad = (edad) => {
    return executeQuery('select * from clientes where edad > ?', [edad]);
}

const create = ({ nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni }) => {
    return executeQuery('insert into clientes (nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni) values(?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni]);
}

const deleteById = (clienteId) => {
    return executeQuery('delete from clientes where id = ?', [clienteId]);
}

const updateById = (clienteId, { cuota, nombre, apellidos, direccion, email, edad, genero, dni }) => {
    return executeQuery(
        'update clientes set nombre = ?, apellidos = ?, direccion = ?, email = ?, edad = ?, genero = ?, cuota = ?, dni = ? where id = ?',
        [nombre, apellidos, direccion, email, edad, genero, cuota, dni, clienteId]
    );
}

const getByProfesor = (profesorId) => {
    return executeQuery('select * from clientes where profesor_id = ?', [profesorId]);
}

const getByUsuario = (usuarioId) => {
    return executeQuery('select * from clientes where usuario_id = ?', [usuarioId]);
}

module.exports = {
    getAll, getById, getByEdad, create, deleteById, updateById, getByProfesor, getByUsuario
}