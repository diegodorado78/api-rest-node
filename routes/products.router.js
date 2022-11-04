const express = require('express');
const router = express.Router(); //no tengo acceso a la app entonces creo un router
const ProductsService = require('../services/products.service');
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find(); //asigno el array llamando al meotod find del serivicio
  res.json(products);
});

//TODO LO QUE ES ESPECIFICO DE IR ANTES DE LO DINAMICO
//caso de uso de un filter
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

//ENDPOINT  con UN parametro findOne
router.get('/:id', async (req, res, next) => {
  try {
    //Si pongo este arriba de filter, a filter me lo tomara como un id
    // los dos puntos significan que viene un param
    const { id } = req.params; // desestructuro id de req que tiene una prop params
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error); //va y ejecuta los middlewares de tipo error
  }
});

//CREATE
router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct); //devuelve el mensaje y el body
});

//PATCH UPDATE PARCIAL DE ALGUNOS CAMPOS
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params; //recibo el id del product a modificar
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

//DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params; //recibo el id del product a modificar
  const rta = await service.delete(id);
  res.json(rta);
});
module.exports = router;
