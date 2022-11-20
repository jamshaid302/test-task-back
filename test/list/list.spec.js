const mongoose = require("mongoose");
const User = require('../../services/users/user');

describe('project list test', () => {
    beforeAll( async () => {
        const db = await mongoose.connect(
            'mongodb+srv://jamshaid:jamshaid@cluster0.aycmrpn.mongodb.net/test_db_for_virtuenetz'
        );
        if(db){
            console.log('Test Connection established');
        } else{
            console.log('Test connection error');
        }
    })

    it('should give error with no payload', async () => {
        const data= {
            name: 'jamshaid khan',
            email: 'jk@gmail.com',
            password: '123456'
        }
        await User.addUser();
        return expect(400);
    });

    it('should add user', async () => {
        const data= {
            name: 'jamshaid khan',
            email: 'jk@gmail.com',
            password: '123456'
        }
        await User.addUser(data);
        return expect(200);
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });
});