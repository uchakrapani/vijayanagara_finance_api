const mongoose = require("mongoose");

// Define the LoanUserStatus schema
const loanUserStatusSchema = mongoose.Schema({
    loanUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'LoanUser', required: true }, // Reference to LoanUser
    status: { 
        type: String, 
        enum: ['submitted', 'document-verification', 'in-progress', 'docs-required', 'approved', 'rejected'], 
        required: true 
    },
    comments: { type: String },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }, // Reference to Admin
    datecreated: { type: Date, default: Date.now }, // Automatically set on creation
    dateupdated: { type: Date }
});

// Create and export the LoanUserStatus model
const LoanUserStatus = mongoose.models.LoanUserStatus || mongoose.model('LoanUserStatus', loanUserStatusSchema);
module.exports = LoanUserStatus;
