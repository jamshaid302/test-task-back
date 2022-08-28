const UserModel = require("../../models/users/user");
const hash = require("../../utility/hashing");
const bcrypt = require("bcrypt");
const conn = require("../../utility/conn");

const UserService = {
    async addUser (data) {
        try{
            const hashedPassword = await hash.generateHash(data.password);
            data.password = hashedPassword;
            let user = new UserModel(data);
            let result = await user.save();
            return {
                message: "User added successfully",
                user: result._doc,
            };
        }catch (err) {
            return err;
        }
    },


    async login (data) {
        try{
            let user = await UserModel.findOne({ email: data.email });
            if(!user) {
                return {
                    errors: [{
                        msg: "Invalid email",
                    }],
                };
            }
            let isMatch = await bcrypt.compare(data.password, user.password);
            if(!isMatch) {
                return {
                    errors: [{
                        msg: "Invalid password",
                    }],
                };
            }
            return {
                user: user._doc,
            };
        }catch (err) {
            return err;
        }
    },
}

module.exports = UserService;
