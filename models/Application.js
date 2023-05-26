const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationModel = {
    class: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
    experience: {
        type: [String],
        required: true,
    },
    availability: {
        type: [String],
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
};

const ApplicationSchema = new Schema(applicationModel, { timestamps: true });

module.exports = mongoose.model("Application", ApplicationSchema);
