const mongoose = require('mongoose');
const MessageSchema = require('../schemas/MessageSchema');
const MessageData = { body: 'one body', sender: _id, receiver: _id };
//Mongo Setup
require("dotenv").config();
var url = process.env.mongo_url;

describe('Messages Schema Test', () => {

    //Connection to MongoDB Memory Server through mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save message successfully', async () => {
        const validMessage = new MessageSchema(MessageData);
        const savedMessage = await validMessage.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedMessage._id).toBeDefined();
        expect(savedMessage.body).toBe(MessageData.body);
        expect(savedMessage.sendr).toBe(MessageData.sender);
        expect(savedMessage.receiver).toBe(MessageData.receiver);
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert message successfully, but the field not defined in schema should be undefined', async () => {
        const messageWithInvalidField = new MessageSchema({ body: 'one', sender: _id, receiver: _id, animal: 'Parrot' });
        const savedMessageWithInvalidField = await messageWithInvalidField.save();
        expect(savedMessageWithInvalidField._id).toBeDefined();
        expect(savedMessageWithInvalidField.animal).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should us told us the errors in on body field.
    it('create message without required field should failed', async () => {
        const messageWithoutRequiredField = new MessageSchema({ title: 'newTitle' });
        let err;
        try {
            const savedMessageWithoutRequiredField = await messageWithoutRequiredField.save();
            error = savedMessageWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.body).toBeDefined();
    });
})