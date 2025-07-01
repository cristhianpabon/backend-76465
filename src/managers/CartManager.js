import fs from 'fs/promises';

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    const data = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  async getById(id) {
    const carts = await this.getAll();
    return carts.find(cart => cart.id == id);
  }

  async create() {
    const carts = await this.getAll();
    const newCart = { id: String(Date.now()), products: [] };
    carts.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async addProduct(cartId, productId) {
    const carts = await this.getAll();
    const cartIndex = carts.findIndex(cart => cart.id == cartId);
    if (cartIndex === -1) return { error: 'Carrito no encontrado' };

    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex(cartProduct => cartProduct.product === productId);
    if (productIndex === -1) {
      cart.products.push({ product: productId, quantity: 1 });
    } else {
      cart.products[productIndex].quantity += 1;
    }

    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return cart;
  }
}