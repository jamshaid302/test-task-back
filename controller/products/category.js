const express = require('express');
const router = express.Router();
const CategoryService = require('../../services/products/category');
const Joi = require('joi')

//get all Categories
router.get('/',async (req,res)=>{
   const result = await CategoryService.getAllCategories();
    if(result.errors) {
        return res.status(400).send(result.errors);
    }
    return res.send(result);
});

router.post('/addcategory', async (req, res) => {
    const schema = Joi.object({
            product: Joi.string().required(),
            category: Joi.string().required(),
        })
        const validationResult = schema.validate(req.body);
        if(validationResult.error) {
            return res.status(400).send(validationResult.error.details);
        }
    const result = await CategoryService.addCategory(req.body);
    if(result.errors) {
        return res.status(400).send(result.errors);
    }
    return res.status(201).send(result);
});

//get Category for update
router.get('/getcategorydataforupdate/:id',async (req,res)=>{
    const result = await CategoryService.getCategoryDataForUpdate(req.params.id);
    if(result.errors) {
        return res.status(400).send(result.errors);
    }
    return res.status(200).send(result);
});

router.post('/updatecategory', async (req, res) => {
    const Schema = Joi.object({
        _id : Joi.string().required(),
        product: Joi.string().required(),
        category: Joi.string().required(),
        })
        const validationResult = Schema.validate(req.body);
        if(validationResult.error) {
            return res.status(400).send(validationResult.error.details);
        }
    const result = await CategoryService.updateCategory(req.body);
    if(result.errors) {
        return res.status(400).send(result.errors);
    }
    return res.status(200).send(result);
})

//delete Category
router.get('/deletecategory/:id', async (req, res) => {
    const result = await CategoryService.deleteCategory(req.params.id);
    if(result.errors) {
        return res.status(400).send(result.errors);
    }
    return res.status(200).send(result);
})


module.exports=router;
