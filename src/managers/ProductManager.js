import fs from 'fs/promises';

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    const data = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  async getById(id) {
    const products = await this.getAll();
    return products.find(product => product.id == id);
  }

  async create(productData) {
    const products = await this.getAll();
    const newProduct = {
      id: String(Date.now()),
      ...productData
    };
    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async update(id, updateData) {
    const products = await this.getAll();
    const index = products.findIndex(product => product.id == id);
    if (index === -1) return { error: 'Producto no encontrado' };

    const product = products[index];
    products[index] = { ...product, ...updateData, id: product.id };
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async delete(id) {
    const products = await this.getAll();
    const filtered = products.filter(product => product.id != id);
    await fs.writeFile(this.path, JSON.stringify(filtered, null, 2));
    return { deleted: id };
  }
}