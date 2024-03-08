import { ProductRepository } from "./product.repository.js";

export class ProductController {
  constructor() {
    this.prodRepo = new ProductRepository();
  }

  //Function to return all products stored in database
  async getAllProducts(req, res, next) {
    try {
      const products = await this.prodRepo.getAllProducts();
      if (products.length != 0)
        return res
          .status(200)
          .json({
            success: true,
            message: "List of Products",
            data: { products },
          });
      else
        return res
          .status(200)
          .json({
            success: true,
            message: "List of Products",
            data: { products: "No products yet" },
          });
    } catch (error) {
      next(error);
    }
  }

  //Function to add a product in database
  async addProduct(req, res, next) {
    try {
      //if admin does not provide name of the product
      if (!req.body.name) {
        return res.status(400).json({
          success: false,
          message: "operation unsuccessful",
          error: "Name is required",
        });
      }

      //if admin does not provide quantity of the product
      if (!req.body.quantity) {
        return res.status(400).json({
          success: false,
          message: "operation unsuccessful",
          error: "Quantity is required",
        });
      }

      //add product in database
      const resp = await this.prodRepo.addProduct(req.body);
      if (resp.success)
        return res
          .status(201)
          .json({
            success: true,
            message: "operation successful",
            data: resp.res,
          });
    } catch (error) {
      next(error);
    }
  }

  //Function to delete a product from database based on product id
  async deleteProduct(req, res, next) {
    try {
      const resp = await this.prodRepo.deleteProduct(req.params.id);

      return res
        .status(resp.statusCode)
        .json({ data: { success: resp.success, message: resp.res } });
    } catch (error) {
      next(error);
    }
  }

  //Function to update product quantity based on the product id
  async updateProduct(req, res, next) {
    try {
      const resp = await this.prodRepo.updateProduct(
        req.params.id,
        req.query.number
      );

      return res
        .status(resp.statusCode)
        .json({
          data: { success: resp.success, product: resp.res, message: resp.msg },
        });
    } catch (error) {
      next(error);
    }
  }
}
