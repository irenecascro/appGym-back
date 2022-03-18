const router = require('express').Router();

const profesorModel = require('../../models/profesor.model');
const clienteModel = require('../../models/cliente.model');

router.get('/', async (req, res) => {
    const profesores = await profesorModel.getAll();
    res.json(profesores);
});

router.get('/:profesorId', async (req, res) => {
    // Recupero el profesor por ID
    const profesor = await profesorModel.getById(req.params.profesorId);
    // Recupero todos los clientes del profesor
    const arrClientes = await clienteModel.getByProfesor(req.params.profesorId);

    profesor.clientes = arrClientes;

    res.json(profesor);
});

router.post('/', async (req, res) => {
    const result = await profesorModel.create(req.body);
    const profesor = await profesorModel.getById(result.insertId);
    res.json(profesor);
});

router.put('/:profesorId', async (req, res) => {
    const result = await profesorModel.updateById(req.params.profesorId, req.body);
    const profesor = await profesorModel.getById(req.params.profesorId);
    res.json(profesor);
});

router.delete('/:profesorId', async (req, res) => {
    const result = await profesorModel.deleteById(req.params.profesorId);
    if (result.affectedRows === 1) {
        res.json({ success: 'Se ha borrado el profesor' })
    } else {
        res.json({ error: 'No se ha borrado el profesor' });
    }
});

module.exports = router;