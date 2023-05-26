const express = require("express");
const router = express.Router();
const Job = require("../../models/Job");

router.get("/", async (req, res) => {
    const jobs = await Job.find();
    return res.status(200).json(jobs);
});

router.get("/featured", async (req, res) => {
    const jobs = await Job.find({ status: "open" })
        .sort({ createdAt: 1 })
        .limit(3);

    return res.status(200).json(jobs);
});

router.get("/:id", async (req, res) => {
    const job = await Job.findById(req.params.id);
    return res.status(200).json(job);
});

router.post("/", async (req, res) => {
    const newJob = new Job({
        ...req.body,
    });

    newJob.save();

    return res.status(200).send(newJob);
});

module.exports = router;
