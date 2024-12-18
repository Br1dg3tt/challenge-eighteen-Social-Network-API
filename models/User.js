const { Schema, model } = require('mongoose');

const validateEmail = function(email) {
    const response = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return response.test(email);
}

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'true',
            trim: true,
        },
        email: {
            type: String,
            required: 'true',
            unique: true,
            trim: true,
            lowercase: true,
            validate: [validateEmail, 'Please enter a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;