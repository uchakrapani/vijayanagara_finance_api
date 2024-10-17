const mongoose = require("mongoose");

const APIErrorSchema = mongoose.Schema({
    message: string,
    statck: string,
    datecreated: { type: Date, default: Date.now }
});

model.export = mongoose.model("APIError", APIErrorSchema);