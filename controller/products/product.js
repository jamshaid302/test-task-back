const express = require('express');
const router = express.Router();
const ProductService = require('../../services/products/product');
const Joi = require('joi');
const {Schema} = require("mongoose");

//get all Products
router.get('/',async (req,res)=>{
   const result = await ProductService.getAllProducts();
    if(result.errors) {
        return res.status(400).send(result.errors);
    }
    return res.status(200).send(result);
});

router.post('/addproduct', async (req, res) => {
    const schema = Joi.object({
            product_name: Joi.string().required(),
        })
        const validationResult = schema.validate(req.body);
        if(validationResult.error) {
            return res.status(400).send(validationResult.error.details);
        }
    const result = await ProductService.addProduct(req.body);
    if(result.errors) {
        return res.status(400).send(result.errors);
    }
    return res.status(201).send(result);
});

//get product for update
router.get('/getproductdataforupdate/:id',async (req,res)=>{
    const result = await ProductService.getProductDataForUpdate(req.params.id);
    if(result.errors) {
        return res.status(400).send(result.errors);
    }
    return res.status(200).send(result);
});

router.post('/updateproduct', async (req, res) => {
    const Schema = Joi.object({
        _id: Joi.string().required(),
        product_name: Joi.string().required(),
        })
        const validationResult = Schema.validate(req.body);
        if(validationResult.error) {
            return res.status(400).send(validationResult.error.details);
        }
    const result = await ProductService.updateProduct(req.body);
    if(result.errors) {
        return res.status(400).send(result.errors);
    }
    return res.status(200).send(result);
})

//delete product
router.get('/deleteproduct/:id', async (req, res) => {
    const result = await ProductService.deleteProduct(req.params.id);
    if(result.errors) {
        return res.status(400).send(result.errors);
    }
    return res.status(200).send(result);
})


module.exports=router;
