const Product = require('../models/Product');

async function getProducts(_req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}

async function createProduct(req, res) {
  try {
    const product = req.body;

    if (!product?.name || !product?.pricePerYard) {
      return res.status(400).json({ error: 'Product name and price are required.' });
    }

    const newProduct = new Product({
      ...product,
      id: product.id || `prod-${Date.now()}`,
      viewsCount: product.viewsCount ?? 0,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body, id: req.params.id },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
}

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };