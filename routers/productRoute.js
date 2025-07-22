import express from "express";
import ProductController from "../controllers/productController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/all-products", ProductController.allProducts);
router.get("/single-product/:id", ProductController.singleProduct);
router.post(
  "/create-product",
  upload.single("image"),
  ProductController.createProduct
);
router.put(
  "/update-product/:id",
  upload.single("image"),
  ProductController.updateProduct
);
router.delete("/delete-product/:id", ProductController.deleteProduct);

export default router;
