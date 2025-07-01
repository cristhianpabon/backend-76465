import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('./src/data/carts.json');

router.post('/', async (req, res) => {
  const newCart = await cartManager.create();
  res.status(201).json(newCart);
});

router.get('/:cartId', async (req, res) => {
  const cart = await cartManager.getById(req.params.cartId);
  res.json(cart || { error: 'Carrito no encontrado' });
});

router.post('/:cartId/product/:productId', async (req, res) => {
  const updatedCart = await cartManager.addProduct(req.params.cartId, req.params.productId);
  res.json(updatedCart);
});

export default router;