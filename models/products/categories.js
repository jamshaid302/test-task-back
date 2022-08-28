const mongoose = require("mongoose");
let ProductCategorySchema = new mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "products",
    },
    category: {
        type: String
    }
});

module.exports = mongoose.model("categories",ProductCategorySchema);