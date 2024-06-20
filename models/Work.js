// models/Work.js
import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    workPhotoPaths: [{
        type: String,
        required: true,
    }],
}, { timestamps: true });

const Work = mongoose.models.Work || mongoose.model("Work", WorkSchema);

export default Work;
