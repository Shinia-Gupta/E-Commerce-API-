# Product API

This repository contains an API for managing products.

## Routes
You can refer to the routes at `localhost:<PORT>/api-docs`

OR

From `/api/products/`
### Get All Products
- **Endpoint**: `GET /`
- **Description**: Get List of Products.
- **Request Body**: null
- **Response**
   The response will contain the list of all products.
  
### Create Product
- **Endpoint**: `POST /create`
- **Description**: Adds a new product.
- **Request Body**: 
  - Ensure to provide the necessary details of the product in the request body.
- **Example**:
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "price": 10.99,
    "quantity": 100
  }
  ```
- **Response**
   The response will contain the details of the created product.

### Delete Product
- **Endpoint**: `DELETE /:id`
- **Description**: Deletes a product by its ID.
- **Parameters**:
- id: The unique identifier of the product to be deleted.
- **Response**
  A success message indicating the deletion of the product.

### Update Product Quantity
- **Endpoint**: `PUT /:id/update_quantity/?number=quantity`
- **Description**: Updates the quantity of a product by its ID.
- **Parameters**:
  id: The unique identifier of the product to be updated.
- **Query Params**:
  Provide the new quantity of the product in the request query parameters.
- **Response**:
  The response will contain the updated details of the product.

## Usage
  To use this API, make HTTP requests to the appropriate endpoints as described above.

## Contributing
  Contributions are welcome! If you find any issues or would like to add new features, feel free to open a pull request.

## Project Live
  [Project Live]()
