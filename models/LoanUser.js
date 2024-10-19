const mongoose = require("mongoose");

// Define the LoanUser schema
const loanUserSchema = mongoose.Schema({
    reference_no: String,
    fullName: String,
    emailId: String,
    phone: String,
    pancard: String,
    aadhar: String,
    salary: String,
    loan_amount_req: String,
    city: String,
    state: String,
    zipcode: String,
    status: { type: String, enum: ['submitted', 'document-verification','in-progress','docs-required','approved','rejected'], required: true },
    datecreated: { type: Date, default: Date.now },
    dateupdated: { type: Date, default: Date.now }
});

// Pre-save hook to generate the reference_no before saving the document
loanUserSchema.pre('save', async function (next) {
    const loanUser = this;

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
