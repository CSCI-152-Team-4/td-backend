//Mongo Setup
require("dotenv").config();
var url = process.env.mongo_url;

const mongoose = require('mongoose');
const PostSchema = require('../schemas/PostSchema');
const postData = {
    title: 'New Title',
    body: 'one body',
    //poster: _id,
    //comments: [],
    tags: []
};

describe('Posts Schema Test', () => {

    //Connection to MongoDB Memory Server through mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save post successfully', async () => {
        const validPost = new PostSchema(postData);
        const savedPost = await validPost.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedPost._id).toBeDefined();
        expect(savedPost.title).toBe(postData.title);
        expect(savedPost.body).toBe(postData.body);
        //expect(savedPost.poster).toBe(postData.poster);or expect(savedPost.poster).toBeDefined();
        //expect(savedPost.comments).toBe(postData.comments);
        expect(savedPost.tags).toBe(postData.tags);

    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert post successfully, but the field not defined in schema should be undefined', async () => {
        const postWithInvalidField = new PostSchema({ title: 'title', body: 'one', /*poster: 'some-user-id', comments: [],*/ tags: [], animal: 'Parrot' });
        const savedPostWithInvalidField = await postWithInvalidField.save();
        expect(savedPostWithInvalidField._id).toBeDefined();
        expect(savedPostWithInvalidField.animal).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should us told us the errors in on body field.
    it('create post without required field should failed', async () => {
        const postWithoutRequiredField = new PostSchema({ title: 'newTitle' });
        let err;
        try {
            const savedPostWithoutRequiredField = await postWithoutRequiredField.save();
            error = savedPostWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.body).toBeDefined();
    });
})