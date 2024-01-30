import express from "express";
const router = express.Router();
// import products from '../data/products.js'
// import asyncHandler from "../middleware/asyncHandler.js";
// import Product from "../models/productModel.js"

import {getProduct, getProductById} from '../controllers/productController.js'

/* // .. get it from productController
router.get("/", asyncHandler(async (req,res)=>{
    const products = await Product.find({})
    res.json(products)
}))

// router.get("/:id", asyncHandler((req,res)=>{
//     const product = products.find((p)=> p._id === req.params.id) //  arrow function
//     if (product) {
//         res.json(product);
//     } else {
//         res.status(404).json({ message: 'Product not found' });
//     }
    
// }))

router.get("/:id", asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('resource not found');
    }
}))
 */

router.route('/').get(getProduct);
router.route('/:id').get(getProductById);

export default router;