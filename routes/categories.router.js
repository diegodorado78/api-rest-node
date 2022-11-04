const express = require('express');
const router = express.Router(); //no tengo acceso a la app entonces creo un router
//devuelve todos los productos de una categoria especifica
router.get('/:id/products', (req, res) => {
  const { id } = req.params; // desestructuro id de req que tiene una prop params
  res.json({ id, name: 'pdto1', price: 60 });
});
//devuelve un producto especifico de una categoria especifica
router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params; // desestructuro id de req que tiene una prop params
  res.json({
    categoryId,
    productId,
    category: 'house keeping',
    name: 'pdto1',
    price: 30,
  });
});
module.exports = router;
