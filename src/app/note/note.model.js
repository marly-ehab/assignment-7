const mongoose = require('mongoose');

// Rejects titles that are entirely uppercase (e.g. "FIRST NOTE").
// A title with no letters at all (numbers/symbols only) is allowed through,
// since "uppercase" has no meaning for it.
function titleNotAllUppercase(title) {
    const hasLetters = /[a-zA-Z]/.test(title);
    if (!hasLetters) return true;
    return title !== title.toUpperCase();
}

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            validate: {
                validator: titleNotAllUppercase,
                message: (props) => `"${props.value}" title must not be entirely uppercase.`,
            },
        },
        content: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model('Note', noteSchema);