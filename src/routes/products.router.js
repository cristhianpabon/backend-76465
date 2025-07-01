import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
  const products = await productManager.getAll();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const product = await productManager.getById(req.params.pid);
  res.json(product || { error: 'Producto no encontrado' });
});

router.post('/', async (req, res) => {
  const newProduct = await productManager.create(req.body);
  res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
  const updated = await productManager.update(req.params.pid, req.body);
  res.json(updated);
});

router.delete('/:pid', async (req, res) => {
  const deleted = await productManager.delete(req.params.pid);
  res.json(deleted);
});

export default router;