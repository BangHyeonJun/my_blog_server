import mongoose from "mongoose";

const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
        default: "/statics/img/no_image.png"
    },
    width: { type: Number, required: true, default: 300 },
    height: { type: Number, required: true, default: 300 }
});

const postSchema = new Schema({
    mainImg: imageSchema,
    title: { type: String, required: true },
    category: { type: String, required: true },
    publish_date: { type: Date, required: true },
    content: { type: String, required: false },
    comments: [
        new Schema({
            publish_date: { type: Date, required: true },
            name: { type: String, required: true },
            comment: { type: String, required: false }
        })
    ]
});

export default mongoose.model("Post", postSchema);
