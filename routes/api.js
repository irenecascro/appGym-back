const router = require('express').Router();

const clientesApiRouter = require('./api/clientes');
const profesoresApiRouter = require('./api/profesores');
const usuariosApiRouter = require('./api/usuarios');
const { checkToken, checkRole } = require('./middlewares');

router.use('/clientes', checkToken, checkRole('regular'), clientesApiRouter);
router.use('/profesores', checkToken, profesoresApiRouter);
router.use('/usuarios', usuariosApiRouter);

module.exports = router;