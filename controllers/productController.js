import Product from "../models/productModel.js";
import validator from "../middlewares/validation.js";
import AppError from "../utils/appError.js";
import APIFEATURES from "../utils/apiFeatures.js";
import { uploadImage, deleteImage } from "../utils/imageUpload.js";

class ProductController {
  async allProducts(req, res, next) {
    try {
      const features = new APIFEATURES(Product.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

      const products = await features.query;
      const count = await Product.countDocuments();

      if (!products || products.length === 0) {
        return next(new AppError("No product or products found!", 404));
      }
      const totalPages = Math.ceil(count / features.query.limit || 10);
      const currentPage = parseInt(req.query.page, 10) || 1;

      res.status(200).json({
        status: "success",
        message: "Products fetched succesfully",
        totalPages,
        currentPage,
        results: products.length,
        data: {
          products,
        },
      });
    } catch (error) {
      return next(
        new AppError(`get all products failed: ${error.message}`, 500)
      );
    }
  }

  async singleProduct(req, res, next) {
    try {
      const productId = req.params.id;
      if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new AppError("Invalid product ID format", 400));
      }
      const product = await Product.findById(productId);
      if (!product) {
        return next(new AppError("product not found", 404));
      }
      res.status(200).json({
        status: "success",
        message: "product fetched succesfully",
        data: {
          product,
        },
      });
    } catch (error) {
      return next(
        new AppError(`get single product failed: ${error.message}`, 500)
      );
    }
  }

  async createProduct(req, res, next) {
    try {
      const { name, category, price, description, color } = req.body;
      if (!req.file) {
        return next(new AppError("Please upload an image", 400));
      }
      const { error } = validator.createProductSchema.validate({
        name,
        category,
        price,
        description,
        color,
      });
      if (error) {
        return next(new AppError(error.details[0].message, 400));
      }
      const result = await uploadImage(req.file);
      const product = await Product.create({
        ...req.body,
        image: result.secure_url,
      });
      res.status(201).json({
        status: "success",
        message: "product created successfully",
        data: {
          product,
        },
      });
    } catch (error) {
      return next(new AppError(`Create product failed: ${error.message}`, 500));
    }
  }

  async updateProduct(req, res, next) {
    try {
      const productId = req.params.id;
      if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new AppError("Invalid product ID format", 400));
      }
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return next(new AppError("product not found", 404));
      }

      const { name, category, price, description, color } = req.body;
      let imageUrl = existingProduct.image;
      // upload image if provided
      if (req.file) {
        // Delete old image first
        await deleteImage(existingProduct.image);
        // uplaod new image
        const result = await uploadImage(req.file);
        imageUrl = result.secure_url;
      }
      const { error } = validator.updateProductSchema.validate({
        name,
        category,
        price,
        description,
        color,
      });
      if (error) {
        return next(new AppError(error.details[0].message, 400));
      }
      const product = await Product.findByIdAndUpdate(
        productId,
        { name, category, price, description, color, image: imageUrl },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        status: "success",
        message: "update product successful",
        data: {
          product,
        },
      });
    } catch (error) {
      return next(new AppError(`update product failed: ${error.message}`, 500));
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const productId = req.params.id;
      if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new AppError("Invalid product ID format", 400));
      }
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return next(new AppError("product not found", 404));
      }
      // Delete image from Cloudinary first
      await deleteImage(existingProduct.image);
      // Then delete product from database
      await Product.findByIdAndDelete(productId);
      res.status(204).json({
        status: "success",
        message: "product deleted",
      });
    } catch (error) {
      return next(new AppError(`delete product failed: ${error.message}`, 500));
    }
  }
}

export default new ProductController();
