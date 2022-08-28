const ProductModel = require("../../models/products/product");
const conn = require("../../utility/conn");

const ProductService = {
    async addProduct (data) {
        try{
            let product = new ProductModel(data);
            let result = await product.save();
            return {
                message: "Product added successfully",
                product: result._doc,
            };
        }catch (err) {
            return err;
        }
    },

    async getProductDataForUpdate(id){
        try{
            let result = await ProductModel.findOne({_id:id});
            return {
                message: "Product data found",
                productData: result._doc,
            };
        }catch (err){
            return err;
        }
    },

    async updateProduct (data) {
        try{
            let result = await ProductModel.updateOne({_id: data._id},{product_name: data.product_name});
            return {
                message: "Product updated successfully",
                product: result._doc,
            };
        }catch (err) {
            return err;
        }
    },

    async deleteProduct (id) {
        try{
            let result = await ProductModel.findByIdAndDelete({_id: id});
            return {
                message: "Product deleted successfully",
                product: result._doc,
            };
        }catch (err) {
            return err;
        }
    },

    async getAllProducts(){
        try{
            let result = await ProductModel.find({});
            return {
                message: "Product data",
                products: result,
            };
        }catch (err) {
            return err;
        }
    },
}

module.exports = ProductService;
