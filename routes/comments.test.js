const mongoose = require('mongoose');
const CommentSchema = require('../schemas/CommentSchema');
const CommentData = { body: 'New body', commenter: _id, votes: 2};
//Mongo Setup
require("dotenv").config();
var url = process.env.mongo_url;

describe('Comments Schema Test', () => {

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
        const validComment = new CommentSchema(CommentData);
        const savedComment = await validComment.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedComment._id).toBeDefined();
        expect(savedComment.body).toBe(CommentData.body);
        expect(savedComment.commenter).toBe(CommentData.commenter);
        expect(savedComment.votes).toBe(CommentData.votes);
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert comment successfully, but the field not defined in schema should be undefined', async () => {
        const commentWithInvalidField = new CommentSchema({ body: 'body', commenter: _id, votes: 1, animal: 'Parrot' });
        const savedCommentWithInvalidField = await commentWithInvalidField.save();
        expect(savedCommentWithInvalidField._id).toBeDefined();
        expect(savedCommentWithInvalidField.animal).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should us told us the errors in on body field.
    it('create comment without required field should failed', async () => {
        const commentWithoutRequiredField = new CommentSchema({ commenter: 'some-user-id'});
        let err;
        try {
            const savedCommentWithoutRequiredField = await commentWithoutRequiredField.save();
            error = savedCommentWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.body).toBeDefined();
    });
})