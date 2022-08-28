const mongoose = require("mongoose");
let ProductSchema = new mongoose.Schema({
    product_name : String
});

module.exports = mongoose.model("products",ProductSchema);
