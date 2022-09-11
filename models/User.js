const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema (
    {
        // Structure for the username field of the database
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        // Structure for the email field of the database
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },

        // Structure for thoughts field of the database referencing the Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],

        // Structure for friends field of the database referencing the User model
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
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

// Calculated "virtual" field for number of friends by counting the number of items in the friends column
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;