import express from "express";

const router = express.Router();

// validar que solo se pueden crear lo productos por rol "Seller"
router.post('/newProduct', productValidator, registerProduct);
// que no regrese los productos con inventario 0
router.get('/allProducts', getAllProducts);

export default router;