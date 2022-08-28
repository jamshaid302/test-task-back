const express = require('express');
const router = express.Router();
const UserService = require('../../services/users/user');
const Joi = require('joi');
const passport = require("passport");
const jwt = require("jsonwebtoken");

const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secretkey",
};
passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        return done(null, jwt_payload);
    })
);

//User SignUp
router.post('/signup',  async (req, res) => {
    try{
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        })
        const validationResult = schema.validate(req.body);
        if(validationResult.error) {
            return res.status(400).send(validationResult.error.details);
        }
        const result = await UserService.addUser(req.body);
        if(result.errors) {
            return res.status(400).send(result.errors);
        }
        return res.status(201).send(result);
    }catch (e) {
        res.send(e)
    }
})


//User Login
router.post("/login", async  (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    const validationResult = schema.validate(req.body);
    if(validationResult.error) {
        return res.status(400).send(validationResult.error.details);
    }
    const result = await UserService.login(req.body);
    if(result.errors) {
        return res.status(400).send(result.errors);
    }
    jwt.sign(
        {
            id: result.user._id,
            email: result.user.email,
        }
        ,"secretkey",
        {
            expiresIn : 3600,
        }, (err, token) => {
            if(err) {
                return res.status(400).send(err);
            }
            return res.status(200).send({
                message: "Login successful",
                token: token,
            })
        })
});


module.exports=router;