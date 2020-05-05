//Mongo Setup
require("dotenv").config();
var url = process.env.mongo_url;

const mongoose = require('mongoose');
const UserSchema = require('./UserSchema');
const userData = {
    email: 'testing@mail.fresnostate.edu',
    password: 'one', firstName: 'test',
    userName: 'username1',
    lastName: 'that',
    //friends: [],
    //friendCode: 
};

describe('User Schema Test', () => {

    //Connection to MongoDB Memory Server through mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save user successfully', async () => {
        const validUser = new UserSchema(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.firstName).toBe(userData.firstName);
        expect(savedUser.lastName).toBe(userData.lastName);
        expect(savedUser.friends).toBe(userData.friends);
        //expect(savedUser.friendCode).toBe(userData.friendCode);
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
        const userWithInvalidField = new UserSchema({ email: 'testingthis@mail.fresnostate.edu', password: 'one', name: 'Riot' });
        const savedUserWithInvalidField = await userWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.name).toBeUndefined();
    });
    
    // Test Validation is working!!!
    // It should us told us the errors in on password field.
    it('create user without required field should failed', async () => {
        const userWithoutRequiredField = new UserSchema({ email: 'tester@mail.fresnostate.edu' });
        let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.password).toBeDefined();
    });
})