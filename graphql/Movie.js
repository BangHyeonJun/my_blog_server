import mongoose from "mongoose";

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    id: String,
    title: String,
    rating: Number
});

export default mongoose.model("Movie", movieSchema);
