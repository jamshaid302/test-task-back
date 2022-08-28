const CategoryModel = require("../../models/products/categories");
const conn = require("../../utility/conn");
const { ObjectId } = require('mongodb');

const CategoryService = {
    async addCategory (data) {
        try{
            let category = new CategoryModel(data);
            let result = await category.save();
            return {
                message: "Category added successfully",
                category: result._doc,
            };
        }catch (err) {
            return err;
        }
    },

    async getCategoryDataForUpdate(id){
        try{
            let result = await CategoryModel.aggregate([
                {
                    $match: {_id:ObjectId(id)}
                },
                {
                    $lookup: {
                        from: "products",
                        let: { productId: "$product" },
                        pipeline:[
                            {
                               $match: {
                                   $expr: { $eq: ["$_id", "$$productId"] },
                               }
                            }
                        ],
                        as:'product'
                    }
                }
            ]);
            return {
                message: "Category data found",
                category: result[0],
            };
        }catch (err){
            return err;
        }
    },

    async updateCategory (data) {
        try{
            let result = await CategoryModel.findByIdAndUpdate(
                data._id,
                {
                    product: data.product,
                    category:data.category
                });
            return {
                message: "Category updated successfully",
                category: result._doc,
            };
        }catch (err) {
            return err;
        }
    },

    async deleteCategory (id) {
        try{
            let result = await CategoryModel.findByIdAndDelete({_id: id});
            return {
                message: "Category deleted successfully",
                category: result._doc,
            };
        }catch (err) {
            return err;
        }
    },

    async getAllCategories(){
        try{
            let result = await CategoryModel.find().populate('product');
            return {
                message: "Category data",
                categories: result,
            };
        }catch (err) {
            return err;
        }
    },
}

module.exports = CategoryService;
