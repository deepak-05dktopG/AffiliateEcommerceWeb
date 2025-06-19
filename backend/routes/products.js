// // const express = require('express');
// // const router = express.Router();
// // const { getProducts } = require('../controllers/productController');

// // router.post('/items', getProducts);

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Product = require('../models/product');

// // GET /api/products
// router.get('/items', async (req, res) => {
//   try {
//     const products = await Product.find(); // Fetch all products
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getParticularProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addProduct,
} = require("../controllers/productController");

router.post("/", addProduct);
router.get("/items", getAllProducts);
router.get("/item/:id", getParticularProduct);
router.delete("/items/:id", deleteProduct);
router.put("/items/:id", updateProduct);

module.exports = router;
