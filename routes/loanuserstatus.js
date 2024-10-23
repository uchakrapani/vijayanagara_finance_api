const express = require("express");
const router = express.Router();
const LoanUserStatus = require("../models/LoanUserStatus");

// Create LoanUserStatus
router.post('/', async (req, res, next) => {
    try {
        const loanUserStatusData = new LoanUserStatus(req.body);  // Use req.body directly
        await loanUserStatusData.save();  // Save operation
        res.status(201).json(loanUserStatusData);
    } catch (err) {
        next(err);  // Forward the error to the error-handling middleware
    }
});

// Get All LoanUserStatus
router.get('/', async (req, res, next) => {
    try {
        const statuses = await LoanUserStatus.find().lean();  // Use lean() for performance
        res.status(200).json(statuses);
    } catch (err) {
        next(err);  // Forward the error to the error-handling middleware
    }
});

// Get a LoanUserStatus by ID
router.get('/:id', async (req, res, next) => {
    try {
        const status = await LoanUserStatus.findById(req.params.id);
        if (!status) return res.status(404).json({ message: 'LoanUserStatus not found' });
        res.json(status);
    } catch (err) {
        next(err);
    }
});

// Update a LoanUserStatus
router.put('/:id', async (req, res, next) => {
    try {
        const status = await LoanUserStatus.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!status) return res.status(404).json({ message: 'LoanUserStatus not found' });
        res.json(status);
    } catch (err) {
        next(err);
    }
});

// Delete a LoanUserStatus
router.delete('/:id', async (req, res, next) => {
    try {
        const status = await LoanUserStatus.findByIdAndDelete(req.params.id);
        if (!status) return res.status(404).json({ message: 'LoanUserStatus not found' });
        res.json({ message: 'LoanUserStatus deleted' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
