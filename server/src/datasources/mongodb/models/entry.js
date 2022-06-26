const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            index: { unique: true }
        },
        content: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag"
            }
        ],
    },
    {
        timestamps: true
    }
);

const Entry = mongoose.model("Entry", EntrySchema);
module.exports = Entry;