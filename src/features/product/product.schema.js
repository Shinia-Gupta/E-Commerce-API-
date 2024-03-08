// import mongoose from "mongoose";

// const prodSchema=new mongoose.Schema({
//     name:{type:String,required:true},
//     quantity:{type:Number,required:true,min:[1,'Minimum 1 quantity should be there']}
// });
// export const ProductModel=mongoose.model('product',prodSchema);
import mongoose from "mongoose";

// Define a validator function for the quantity field
function validateQuantity(value) {
    return value >= 1;
}

const prodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true, validate: [validateQuantity,{message: 'Minimum 1 quantity should be there'}] }
});

export const ProductModel = mongoose.model('product', prodSchema);
