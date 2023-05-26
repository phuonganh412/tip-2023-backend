const express = require("express");
require("dotenv").config(); // for loading environment variables
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const job = require("./routes/api/job");
const application = require("./routes/api/application");
const cors = require("cors");

const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// db configuration
const DB_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";
mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("Database connected successful"))
    .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

app.use("/api/job/", job);
app.use("/api/apply", application);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
