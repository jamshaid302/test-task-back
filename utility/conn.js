const mongoose = require("mongoose");
require("dotenv").config();

// mongoose.connect(process.env.DB_URI.mongodatabaseConnection,{ useNewUrlParser: true,useUnifiedTopology: true});

    mongoose.connect(process.env.DB_URI)
    const { connection } = mongoose
    connection.once("connected", () => console.log("Database Connected ~"))
    connection.on("error", error => console.log("Database Error: ", error))
