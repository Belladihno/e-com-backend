import express from "express";
import ProductController from "../controllers/productController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();
// GET /v1/products - Get all products
router.get("/", ProductController.allProducts);

// GET /v1/products/:id - Get single product
router.get("/:id", ProductController.singleProduct);

// POST /v1/products - Create new product
router.post(
  "/",
  upload.single("image"),
  ProductController.createProduct
);

// PUT /v1/products/:id - Update product
router.put(
  "/:id",
  upload.single("image"),
  ProductController.updateProduct
);

// DELETE /v1/products/:id - Delete product
router.delete("/:id", ProductController.deleteProduct);

export default router;
