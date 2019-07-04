import mongoose from "mongoose";

const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
    path: {
        type: String,
        default: ""
    }
});

const memberSchema = new Schema({
    avatar: imageSchema,
    username: { type: String, required: true },
    join_date: { type: Date, required: true },
    userid: { type: String, required: true },
    email: { type: String, required: false, default: "" },
    introduce: { type: String, required: false, default: "" },
    sns: [
        new Schema({
            url: { type: String, required: true },
            type: { type: String, required: true }
        })
    ]
});

export default mongoose.model("Member", memberSchema);
