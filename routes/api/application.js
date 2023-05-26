const express = require("express");
const router = express.Router();
const Application = require("../../models/Application");
const Job = require("../../models/Job");

router.post("/", async (req, res) => {
    const job = await Job.findById(req.body.class);

    if (!job) {
        return res.status(404).json({
            message: "Job not found",
        });
    }

    if (job.status === "closed") {
        return res.status(400).json({
            message: "This job is closed",
        });
    }

    const existingApplication = await Application.findOne({
        class: req.body.class,
        email: req.body.email,
        status: "pending",
    });

    if (existingApplication) {
        return res.status(400).json({
            message: "You have already applied for this job",
        });
    }

    const newApplication = new Application({
        ...req.body,
    });
    newApplication.save();

    await Job.findByIdAndUpdate(
        { _id: req.body.class },
        { $inc: { numberOfApplicants: 1 } }
    );

    return res.status(200).json(newApplication);
});

router.get("/email/:email", async (req, res) => {
    const applications = await Application.find({ email: req.params.email });
    return res.status(200).json(applications);
});

router.get("/class/:class", async (req, res) => {
    const applications = await Application.find({ class: req.params.class });
    return res.status(200).json(applications);
});

router.post("/reject/:applicationId", async (req, res) => {
    const application = await Application.findByIdAndUpdate(
        req.params.applicationId,
        {
            status: "rejected",
        }
    );

    return res.status(200).json(application);
});

router.post("/accept/:applicationId", async (req, res) => {
    const application = await Application.findByIdAndUpdate(
        req.params.applicationId,
        {
            status: "accepted",
        }
    );

    const classId = application.class;

    const appliedJob = await Job.findByIdAndUpdate(classId, {
        status: "closed",
    });

    const email = application.email;
    const jobTime = appliedJob.time;
    const acceptedApplicationId = application._id;

    await Application.updateMany(
        {
            _id: { $ne: acceptedApplicationId },
            email: email,
            status: "pending",
            availability: { $in: [jobTime] },
        },
        {
            status: "rejected",
        }
    );

    return res.status(200).json(application);
});

module.exports = router;
