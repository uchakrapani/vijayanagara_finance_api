const express = require("express");
const router = express.Router();
const LoanUserKyc = require("../models/LoanUserKyc");

// Create a new KYC record
router.post("/", async (req, res) => {
    const kycData = new LoanUserKyc(req.body);
    try {
        const savedKyc = await kycData.save();
        res.status(201).json(savedKyc);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get KYC details by LoanUser ID
router.get("/:loanUserId", async (req, res) => {
    try {
        const kycDetails = await LoanUserKyc.findOne({ loanUser: req.params.loanUserId });
        if (!kycDetails) {
            return res.status(404).json({ message: "KYC details not found" });
        }
        res.json(kycDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update KYC details by LoanUser ID
router.put("/:loanUserId", async (req, res) => {
    try {
        const updatedKyc = await LoanUserKyc.findOneAndUpdate(
            { loanUser: req.params.loanUserId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedKyc) {
            return res.status(404).json({ message: "KYC details not found" });
        }
        res.json(updatedKyc);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Export the router
module.exports = router;
