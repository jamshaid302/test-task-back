const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const passport=require('passport');
app.use(passport.initialize());
app.use('/api',passport.authenticate('jwt', { session: false }));
require("dotenv").config();

app.get('/',(req,res)=>{
    res.send('Deploy Project Successfully');
});

const user = require("../controller/users/user");
app.use('/user',user);

const product = require("../controller/products/product");
app.use('/api/product',product);

const category = require("../controller/products/category");
app.use('/api/category',category);

module.exports = app