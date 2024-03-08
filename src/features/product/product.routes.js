import express from 'express';
import { ProductController } from "./product.controller.js";

const productRouter=express.Router();
const productController=new ProductController();

productRouter.get('/',(req,res,next)=>productController.getAllProducts(req,res,next));
productRouter.post('/create',(req,res,next)=>productController.addProduct(req,res,next));
productRouter.delete('/:id',(req,res,next)=>productController.deleteProduct(req,res,next));
productRouter.put('/:id/update_quantity/',(req,res,next)=>productController.updateProduct(req,res,next));
export default productRouter;