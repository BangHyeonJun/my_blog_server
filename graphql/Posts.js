import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    publish_date: { type: Date, required: true },
    content: { type: String, required: false },
    comment: [
        new Schema({
            publish_date: { type: Date, required: true },
            name: { type: String, required: true },
            content: { type: String, required: false }
        })
    ]
});

export default mongoose.model("Post", postSchema);
