const { Schema, model, Types } = require('mongoose');

const thoughtSchema = new Schema (
    {
        // Structure for thoughts field of the database
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },

        // Structure for the createdAt field of the database
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateVal => new Date("<YYYY-mm-ddTHH:MM:ss>")
        },

        // Structure for the username field of the database
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },

        id: false,
    }
)



const reactionSchema = new Schema (
    {
        // Structure for the reactionId field of the database
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        // Structure for the reactionBody field of the database
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },

        // Structure for the username field of the database
        username: {
            type: String,
            required: true,
        },

        // Structure for the createdAt field of the database
        createdAt: {
            type: Date,
            default: Date.now(),
            get: dateVal => new Date("<YYYY-mm-ddTHH:MM:ss>"),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        
        id: false,
    }
)

// Virtual schema for getting reaction count by counting the number of valuesw within the reactions field
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;