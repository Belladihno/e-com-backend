# E-commerce Backend API

A RESTful API built with Node.js and Express for an e-commerce platform.

## Features

- Product management (CRUD operations)
- Data validation
- Error handling
- Compression for better performance

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn


## API Endpoints

### Products
- GET `/v1/products/all-products` - Get all products
- GET `/v1/products/single-product/:id` - Get single product
- POST `/v1/products/create-product` - Create new product
- PUT `/v1/products/update-product/:id` - Update product
- DELETE `/v1/products/delete-product/:id` - Delete product

## API Documentation

### Create Product
```http
POST /v1/products/create-product
Content-Type: application/json

{
  "name": "Product Name",
  "category": "Category",
  "price": "99.99",
  "description": "Product description",
  "color": "red",
  "image": "image_url"
}
```

## Security Features

- CORS enabled
- Helmet for security headers
- Request logging
- Data compression

## Error Handling

The API uses a centralized error handling mechanism with proper error messages and status codes.
