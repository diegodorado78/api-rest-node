const faker = require('faker');
const boom = require('@hapi/boom');
class ProductsService {
  constructor() {
    this.products = [];
    this.generate(); //cada vez que genere una instancia del servicio genera 100 pdtos
  }
  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(), //metodo de la libreria para obtener un nombre
        price: parseInt(faker.commerce.price(), 10), //metodo de la libreria para obtener un nombre
        image: faker.image.imageUrl(),
      });
    }
  }
  //CREATE
  async create(data) {
    //data que recibe del cliente
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct); //agrego el producto al array y devuelvo su body
    return newProduct;
  }
  //GET ALL
  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }
  //GET ONE
  async findOne(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }
  //UPDATE
  async update(id, changes) {
    //recibe el id y los cambios al producto
    const index = this.products.findIndex((product) => product.id === id);
    const product = this.products[index]; //recupero el producto
    if (index === -1) {
      //si find no encuentra el elemento, devuelve un -1 (no posicion)
      throw boom.notFound('product not found');
    }
    return (this.products[index] = { ...product, ...changes }); //busca el objeto y le asigna los cambios
  }
  //DELETE
  async delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    this.products.splice(index, 1); //elimina 1 elemento desde la posicion que se pasa
    return { id };
  }
}

module.exports = ProductsService;
