const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = (url) => {
     try{
         const con = mongoose.connect(url, {
             useNewUrlParser: true,
             useUnifiedTopology: true
         });
         if(con) console.log("MongoDB connected...");
         else{
             console.log("MongoDB connection error...");
         }
     }catch (e) {
         console.log(`Error: ${e}`);
     }
 }
    // mongoose.connect(process.env.DB_URI)
    // const { connection } = mongoose
    // connection.once("connected", () => console.log("Database Connected ~"))
    // connection.on("error", error => console.log("Database Error: ", error))
module.exports = connectDB;