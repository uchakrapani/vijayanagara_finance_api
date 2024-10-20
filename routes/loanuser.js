const express = require("express");
const router = express.Router();
const LoanUser = require("../models/LoanUser");

// Create LoanUser
router.post('/', async (req, res, next) => {
    try {
        const locationData = new LoanUser(req.body);  // Use req.body directly
        await locationData.save();  // Use async/await for save operation
        res.status(201).json(locationData);
    } catch (err) {
        next(err);  // Forward the error to the error-handling middleware
    }
});

// Get All Locations
router.get('/', async (req, res, next) => {
    try {
        const loanuser = await LoanUser.find().lean();  // Use async/await and lean() for performance
        res.status(200).json(loanuser);
    } catch (err) {
        next(err);  // Forward the error to the error-handling middleware
    }
});

// Get a loanuser by ID
router.get('/:id', async (req, res, next) => {
    try {
        const loanuser = await LoanUser.findById(req.params.id);
        if (!loanuser) return res.status(404).json({ message: 'Loan User not found' });
        res.json(loanuser);
    } catch (err) {
        next(err);
    }
});

// Update a loanuser
router.put('/:id', async (req, res, next) => {
    try {
        const loanuser = await LoanUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!loanuser) return res.status(404).json({ message: 'Loan User not found' });
        res.json(loanuser);
    } catch (err) {
        next(err);
    }
});

// Delete a loanuser
router.delete('/:id', async (req, res, next) => {
    try {
        const loanuser = await LoanUser.findByIdAndDelete(req.params.id);
        if (!loanuser) return res.status(404).json({ message: 'Loan User not found' });
        res.json({ message: 'LoanUser deleted' });
    } catch (err) {
        next(err);
    }
});

// Route to check if a user with email, phone, pancard, or aadhar exists
router.get('/check', async (req, res, next) => {
    try {
        const { emailId, phone, pancard, aadhar } = req.query;

        const existingUser = await LoanUser.findOne({
            $or: [
                { emailId: emailId },
                { phone: phone },
                { pancard: pancard },
                { aadhar: aadhar }
            ]
        });

        res.status(200).json({
            emailExists: !!existingUser && existingUser.emailId === emailId,
            phoneExists: !!existingUser && existingUser.phone === phone,
            pancardExists: !!existingUser && existingUser.pancard === pancard,
            aadharExists: !!existingUser && existingUser.aadhar === aadhar
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
