var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {
    nombre: 'Mario Girón',
    animales: ['lobo', 'cacatúa', 'gorrión', 'morsa', 'perro']
    // animales: []
  });
});

module.exports = router;

// /clientes -> muestra la lista de clientes