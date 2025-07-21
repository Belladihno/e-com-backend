import express from "express";
import ProductController from "../controllers/productController.js";

const router = express.Router();

router.get("/all-products", ProductController.allProducts);
router.get("/single-product/:id", ProductController.singleProduct);
router.post("/create-product", ProductController.createProduct);
router.put("/update-product/:id", ProductController.updateProduct);
router.delete("/delete-product/:id", ProductController.deleteProduct);

export default router;
