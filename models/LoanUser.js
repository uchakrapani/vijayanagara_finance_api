const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the LoanUser schema
const loanUserSchema = mongoose.Schema({
    reference_no: String,
    fullName: String,
    emailId: { type: String, unique: true }, // Ensures emailId is unique
    phone: { type: String, unique: true },   // Ensures phone is unique
    pancard: { type: String, unique: true }, // Ensures pancard is unique
    aadhar: { type: String, unique: true },  // Ensures aadhar is unique
    salary: String,
    loan_amount_req: String,
    city: String,
    state: String,
    zipcode: String,
    status: { type: String, enum: ['submitted', 'document-verification', 'in-progress', 'docs-required', 'approved', 'rejected'], required: true },
    loginId: { type: String, unique: true, required: true }, // Unique login ID
    password: { type: String, required: true }, // Password
    datecreated: { type: Date, default: Date.now },
    dateupdated: { type: Date, default: Date.now }
});

// Pre-save hook to hash the password before saving
loanUserSchema.pre('save', async function (next) {
    const loanUser = this;

    // Only hash the password if it has been modified or is new
    if (loanUser.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10); // Generate a salt
            loanUser.password = await bcrypt.hash(loanUser.password, salt); // Hash the password
        } catch (error) {
            return next(error); // Pass error to the next middleware
        }
    }

    // Only generate a reference number if it doesn't exist yet
    if (!loanUser.reference_no) {
        try {
            // Find the highest _id value in the LoanUser collection
            const maxUser = await mongoose.model('LoanUser').findOne({}).sort({ _id: -1 });

            // Generate reference number using the format "VFL2402" + max ID (or start from 1 if none found)
            const maxId = maxUser ? maxUser._id : 0;
            loanUser.reference_no = `VFL2402${maxId + 1}`;
        } catch (error) {
            return next(error); // Pass error to the next middleware
        }
    }

    // Update the dateupdated field
    loanUser.dateupdated = Date.now();
    next();
});

// Create and export the LoanUser model
const LoanUser = mongoose.models.LoanUser || mongoose.model('LoanUser', loanUserSchema);
module.exports = LoanUser;
