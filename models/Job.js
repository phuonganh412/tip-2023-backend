const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobModel = {
    class: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "open",
    },
    numberOfApplicants: {
        type: Number,
        default: 0,
    },
};

const JobSchema = new Schema(jobModel, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);
