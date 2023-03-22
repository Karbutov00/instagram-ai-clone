const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title: { type: String, required: true },
        imageURL: { type: String, required: true, default: "#" },
        description: { type: String, required: true },
        postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { collection: "posts" }
);

module.exports = mongoose.model("Post", postSchema);
