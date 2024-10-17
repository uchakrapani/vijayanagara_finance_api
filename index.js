const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const locationRoute = require("./routes/location");
const adminRoute = require("./routes/admin");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin:admin@learningcluster.yywhd.mongodb.net/lbcvfloandb")
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({
        apiStatus: "Last bench coder Vijanagara finance API is running successfully"
    });
});

// Route for location
app.use("/area", locationRoute);
app.use("/admin", adminRoute);

// Error Handling Middleware
app.use((error, req, res, next) => {
    // Log the error (ensure you define the logging mechanism)
    console.error("Error occurred:", error.message);
    // Optionally, save error details in your database (if you have an error model)
    // For example:
    // const errLog = new APIError({ message: error.message, stack: error.stack });
    // errLog.save().then(() => console.log("Error logged in DB"));

    res.status(500).json({ error: "Oops! API failed to respond to your request." });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API is running at Port ${PORT} and URL http://localhost:${PORT}/`);
});
