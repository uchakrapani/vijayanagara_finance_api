const mongoose = require("mongoose");

// Define the LoanUserKyc schema
const loanUserKycSchema = mongoose.Schema({
    loanUser: { type: mongoose.Schema.Types.ObjectId, ref: 'LoanUser', required: true }, // Reference to LoanUser
    PanCardLoc: String,
    PanCardKycDone: { type: Boolean, default: false },
    AadharCardLoc: String,
    AadharCardKycDone: { type: Boolean, default: false },
    PaySlipsLocs: [String], // Array for 3 months payslips
    PaySlipsVerified: { type: Boolean, default: false },
    BankStatementLoc: String,
    BankStatementVerified: { type: Boolean, default: false },
    AnyEMaiPaying: { type: Boolean, default: false },
    UtilityBillLoc: String,
    UtilityBillVerified: { type: Boolean, default: false },
    HouseType: { type: String, enum: ['Own', 'Rented', 'CompanyProvided'], required: true },
    RentPaying: { type: Boolean, default: false }, // If HouseType is Rented
    HouseTypeVerified: { type: Boolean, default: false },
    SelfiLoc: String,
    SelfiVerified: { type: Boolean, default: false },
    CompanyName: String,
    CompanyAddress: String,
    Designation: String,
    AlternatePhoneNo: String,
    CompanyCity: String,
    CompanyState: String,
    CompanyZipCode: String,
    CompanyEmailId: String,
    PermanentAddress: String,
    PermanentCity: String,
    PermanentState: String,
    PermanentZipCode: String,
    CurrentAddress: String,
    CurrentCity: String,
    CurrentState: String,
    CurrentZipCode: String,
}, { timestamps: true });

// Create and export the LoanUserKyc model
const LoanUserKyc = mongoose.models.LoanUserKyc || mongoose.model('LoanUserKyc', loanUserKycSchema);
module.exports = LoanUserKyc;
