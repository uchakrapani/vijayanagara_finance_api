const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    city: String,
    state: String,
    zipcode: String,
    status: { type: String, enum: ['active', 'in-active'], required: true },
    datecreated: { type: Date, default: Date.now },
    dateupdated: { type: Date, default: Date.now }
});

locationSchema.pre('save', function (next) {
    this.dateupdated = Date.now();
    next();
});

const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);
module.exports = Location;