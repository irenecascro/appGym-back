// Los manejadores tienen el prefijo /clientes
const router = require('express').Router();
const dayjs = require('dayjs');

const clienteModel = require('../models/cliente.model');

// GET http://localhost:3000/clientes
router.get('/', async (req, res) => {
    const arrClientes = await clienteModel.getAll(1, 40);
    res.render('clientes/lista', {
        clientes: arrClientes
    });
});

// GET http://localhost:3000/clientes/new
router.get('/new', (req, res) => {
    res.render('clientes/formulario');
});

// GET http://localhost:3000/clientes/edit/899
router.get('/edit/:clienteId', async (req, res) => {
    const cliente = await clienteModel.getById(req.params.clienteId);
    cliente.fecha_nacimiento = dayjs(cliente.fecha_nacimiento).format('YYYY-MM-DD');
    res.render('clientes/formularioEdit', { cliente })
});

// GET http://localhost:3000/clientes/delete/899
router.get('/delete/:clienteId', async (req, res) => {
    const result = await clienteModel.deleteById(req.params.clienteId);
    res.redirect('/clientes');
});

// GET http://localhost:3000/clientes/9998
router.get('/:clienteId', async (req, res) => {
    const cliente = await clienteModel.getById(req.params.clienteId);
    res.render('clientes/show', { cliente: cliente, mensaje: 'Hola' });
});

// POST http://localhost:3000/clientes/create
router.post('/create', async (req, res) => {
    const result = await clienteModel.create(req.body);
    res.redirect('/clientes');
});

// POST http://localhost:3000/clientes/update
router.post('/update', async (req, res) => {
    await clienteModel.updateById(req.body.id, req.body);
    res.redirect('/clientes/' + req.body.id);
});

module.exports = router;



// /clientes/IDCLIENTE
/**
 * 1 - Definir la RUTA
 * 2 - Recuperar el cliente a partir de su ID
 * 3 - Renderizar la vista clientes/show y pasarle a la vista el cliente recuperado
 */

// /clientes/new -> Formulario para crear clientes
/**
 * - Renderiza la vista clientes/formulario.pug
 * - Definir el formulario con todos los campos necesarios para la creación de un cliente
 * - El formulario debe enviarse mediante una petición POST a /clientes/create
 */

// /clientes/delete/IDCLIENTE
/**
 * - Recupera el id del cliente de la url
 * - Borra el cliente de la BD
 * - Redirecciona a la lista de clientes
 * - EXTRA: Dentro de la lista de clientes, ponemos un enlace EN CADA CLIENTE que nos permita borrarlo
 */

// /clientes/edit/IDCLIENTE
/**
 * - Recuperar el cliente que vamos a editar a partir de su ID
 * - Renderizar la vista clientes/formularioEdit.pug y pasarle el cliente
 *  - Dentro del formulario, en cada campo tenemos que visualizar los datos del cliente
 * - Cuando envíe el formulario, debe lanzarse una petición POST sobre /clientes/update -> Comprobar si llegan todos los datos para editar
 */