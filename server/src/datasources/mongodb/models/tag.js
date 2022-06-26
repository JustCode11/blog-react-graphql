const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        entries: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Entry"
            }
        ]
    }
);

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;