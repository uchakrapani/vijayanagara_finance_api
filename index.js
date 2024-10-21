const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const locationRoute = require("./routes/location");
const adminRoute = require("./routes/admin");
const loanUserRoute = require("./routes/loanuser");
const contactRoute = require("./routes/contact");
const backupRoute = require("./routes/backup");
const ErrorLog = require('./models/ErrorLog');
const errorLogRoutes = require('./routes/errorLog'); 

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
app.use("/loanuser", loanUserRoute);
app.use("/contact", contactRoute);
app.use('/errorlogs', errorLogRoutes); 
app.use('/backup',backupRoute);

// Error logging middleware
app.use((err, req, res, next) => {
    const errorLog = new ErrorLog({ message: err.message, stack: err.stack });
    errorLog.save().then(() => console.log('Error logged'));
    res.status(500).json({ message: 'An error occurred, it has been logged.' });
    next();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API is running at Port ${PORT} and URL http://localhost:${PORT}/`);
});
