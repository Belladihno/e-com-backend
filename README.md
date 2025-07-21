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

### Base URL
```
https://e-com-backend-1gac.onrender.com/v1/products
```

### Products

#### Get All Products
```http
GET /v1/products/all-products

Response 200 (application/json)
{
  "status": "success",
  "message": "Products fetched successfully",
  "data": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "category": "Category",
      "price": "99.99",
      "description": "Product description",
      "color": "red",
      "image": "image_url",
      "createdAt": "timestamp"
    }
  ]
}
```

#### Get Single Product
```http
GET /v1/products/single-product/:id

Response 200 (application/json)
{
  "status": "success",
  "message": "Product fetched successfully",
  "data": {
    "product": {
      "_id": "product_id",
      "name": "Product Name",
      "category": "Category",
      "price": "99.99",
      "description": "Product description",
      "color": "red",
      "image": "image_url",
      "createdAt": "timestamp"
    }
  }
}
```

#### Create Product
```http
POST /v1/products/create-product
Content-Type: application/json

Request Body:
{
  "name": "Product Name",
  "category": "Category",
  "price": "99.99",
  "description": "Product description",
  "color": "red",
  "image": "image_url"
}

Response 201 (application/json)
{
  "status": "success",
  "message": "Product created successfully",
  "data": {
    "product": {
      "_id": "product_id",
      "name": "Product Name",
      "category": "Category",
      "price": "99.99",
      "description": "Product description",
      "color": "red",
      "image": "image_url",
      "createdAt": "timestamp"
    }
  }
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error

## Error Response Format
```json
{
  "status": "fail",
  "message": "Error description here"
}
```

## Security Features

- CORS enabled
- Helmet for security headers
- Request logging
- Data compression

## Error Handling

The API uses a centralized error handling mechanism with proper error messages and status codes.
