const router = require('express').Router();
const usuarioModel = require('../../models/usuario.model');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { createToken } = require('../../helpers');
const { checkToken } = require('../middlewares');

router.get('/perfil', checkToken, (req, res) => {
    res.json(req.user);
});

router.post('/registro',
    body('username')
        .exists()
        .withMessage('El campo username es obligatorio')
        .isLength({ min: 3 })
        .withMessage('El campo username debe tener 3 caracteres como mínimo'),
    body('email', 'El email debe tener un formato correcto')
        .isEmail(),
    body('password')
        // .custom(passwordValue => {
        //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(passwordValue);
        // })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    , async (req, res) => {

        console.log(req);

        // Recuperamos los errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        try {

            req.body.password = bcrypt.hashSync(req.body.password);

            const result = await usuarioModel.create(req.body);

            if (result.affectedRows === 1) {
                res.json({ success: 'Usuario registrado correctamente' });
            } else {
                res.json({ error: 'No se ha podido registrar el usuario' });
            }
        } catch (err) {
            res.json({ error: err.message });
        }
    });

router.post('/login', async (req, res) => {
    // ¿Se encuentra el email en la base de datos?
    const usuario = await usuarioModel.getByEmail(req.body.email);

    if (!usuario) {
        return res.status(400).json({ error: 'Error en usuario y/o contraseña1' });
    }

    // ¿Son las password iguales?
    const iguales = bcrypt.compareSync(req.body.password, usuario.password);

    if (!iguales) {
        return res.status(400).json({ error: 'Error en usuario y/o contraseña2' });
    }

    res.json({
        success: 'Login correcto!',
        token: createToken(usuario)
    });

});

module.exports = router;