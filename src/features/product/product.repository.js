import mongoose from "mongoose";
import { ProductModel } from "./product.schema.js";
import { ApplicationError } from "../../error-handlers/errorhandler.js";
import { ObjectId } from "mongodb";

export class ProductRepository {

    //Function to return all products stored in database
  async getAllProducts() {
    try {
      return await ProductModel.find({});
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw error;
      } else {
        throw new ApplicationError(
          500,
          `Something went wrong on our end-${error}`
        );
      }
    }
  }

  //Function to add a product in database
  async addProduct(data) {
    try {
      const newProduct = new ProductModel({
        name: data.name,
        quantity: Number(data.quantity),
      });
      const resp = await newProduct.save();
      return { success: true, res: resp };
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        throw error;
      } else {
        throw new ApplicationError(
          500,
          `Something went wrong on our end-${error}`
        );
      }
    }
  }

  //Function to delete a product from database based on product id
  async deleteProduct(prodId) {
    try {
      const prodToDelete = await ProductModel.findById(prodId);
      if (prodToDelete) {
        const resp = await ProductModel.deleteOne({
          _id: new ObjectId(prodId),
        });
        if (resp.acknowledged)
          return { success: true, statusCode: 200, res: "Product Deleted" };
        else
          return { success: false, statusCode: 400, res: "Invalid Product Id" };
      }
      return { success: false, statusCode: 400, res: "Invalid Product Id" };
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw error;
      } else {
        throw new ApplicationError(
          500,
          `Something went wrong on our end-${error}`
        );
      }
    }
  }

  //Function to update product quantity based on the product id
  async updateProduct(prodId, qty) {
    try {
      qty = Number(qty);
      const prodToUpdate = await ProductModel.findById(prodId);

      if (prodToUpdate) {
        if (qty < 0 && prodToUpdate.quantity < Math.abs(qty)) {
          return {
            success: false,
            statusCode: 400,
            msg: "You are low on stock",
          };
        }
        const resp = await ProductModel.findOneAndUpdate(
          { _id: new ObjectId(prodId) },
          { $inc: { quantity: Number(qty) } },
          { returnOriginal: false }
        );
        console.log(resp);
        return {
          success: true,
          statusCode: 200,
          msg: "updated successfully",
          res: resp,
        };
      }
      return { success: false, statusCode: 400, msg: "Invalid Product Id" };
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw error;
      } else {
        throw new ApplicationError(
          500,
          `Something went wrong on our end-${error}`
        );
      }
    }
  }
  
}
