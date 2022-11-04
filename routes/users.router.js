const express = require('express');
const router = express.Router();

//ENDPOINT con DOS parametro
router.get('/', (req, res) => {
  const { limit, offset } = req.query; //recibira limit y offset como param
  if (limit && offset) {
    //si existen devolvemos esos valores
    res.json({
      limit,
      offset,
    });
  } else {
    //sino un mensaje de alerta
    res.send('No hay parametro');
  }
});
module.exports = router;
