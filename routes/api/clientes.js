// Si antes de llegar a un manejador final, la petición pasa por el middleware checkToken, podemos recuperar el valor de req.user
// GET /api/clientes/me -> Recupera todos los clientes del usuario logado

// GET /api/usuarios/perfil -> Devuelve todos los datos del usuario logado

const router = require('express').Router();

const clienteModel = require('../../models/cliente.model');

// router.get('/', (req, res) => {
//     clienteModel.getAll()
//         .then((result) => {
//             res.json(result);
//         })
//         .catch((err) => {
//             res.json({ error: err.message });
//         });
// });





router.get('/', async (req, res) => {
    try {
        // Recuperar los valores de total y page
        const page = req.query.page || 1;
        const total = req.query.total || 10;

        const result = await clienteModel.getAll(parseInt(page), parseInt(total));
        res.json(result);
    } catch (err) {
        res.json({ error: err.message });
    };
});







router.get('/mayores/:edad', async (req, res) => {
    try {
        const result = await clienteModel.getByEdad(req.params.edad);
        res.json(result);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.get('/me', async (req, res) => {
    try {
        const clientes = await clienteModel.getByUsuario(req.user.id);
        res.json(clientes);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.get('/:clienteId', (req, res) => {
    const clienteId = req.params.clienteId;
    /**
     * getById
     *  - 1 rechazarse por error -> catch
     *  - 2 resuelve null porque no encuentra el cliente -> then
     *  - 3 resuelve con el cliente -> then
     */
    clienteModel.getById(clienteId)
        .then(result => {
            if (!result) return res.json({ error: 'El cliente no existe' });
            res.json(result)
        })
        .catch(err => res.json({ error: err.message }));
});

router.post('/', async (req, res) => {
    try {
        const result = await clienteModel.create(req.body);

        const cliente = await clienteModel.getById(result.insertId);
        res.json(cliente);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.put('/:clienteId', async (req, res) => {
    try {
        const result = await clienteModel.updateById(req.params.clienteId, req.body);
        const cliente = await clienteModel.getById(req.params.clienteId);
        res.json(cliente);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.delete('/:clienteId', (req, res) => {
    clienteModel.deleteById(req.params.clienteId)
        .then(result => {
            if (result.affectedRows === 1) {
                res.json({ mensaje: 'Se ha borrado el cliente' });
            } else {
                res.json({ mensaje: 'El cliente no existe' });
            }
        })
        .catch(err => {
            res.json({ error: err.message });
        });
})

module.exports = router;