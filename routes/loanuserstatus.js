const express = require("express");
const router = express.Router();
const LoanUserStatus = require("../models/LoanUserStatus");
const LoanUser = require("../models/LoanUser"); // Import the LoanUser model

// Create LoanUserStatus
router.post('/', async (req, res, next) => {
    try {
        const loanUserStatusData = new LoanUserStatus(req.body);
        
        // Save the new LoanUserStatus
        const status = await loanUserStatusData.save();

        // Update the related LoanUser's status
        await LoanUser.findByIdAndUpdate(status.loanUserId, { status: status.status }, { new: true });

        res.status(201).json(status);
    } catch (err) {
        next(err);
    }
});

// Get All LoanUserStatus
router.get('/', async (req, res, next) => {
    try {
        const statuses = await LoanUserStatus.find().lean();
        res.status(200).json(statuses);
    } catch (err) {
        next(err);
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

// Get LoanUserStatus by LoanUser._id
router.get('/user/:loanUserId', async (req, res, next) => {
    try {
        const statuses = await LoanUserStatus.find({ loanUserId: req.params.loanUserId }).lean();
        if (statuses.length === 0) return res.status(404).json({ message: 'No statuses found for this LoanUser' });
        res.json(statuses);
    } catch (err) {
        next(err);
    }
});

// Update a LoanUserStatus
router.put('/:id', async (req, res, next) => {
    try {
        const status = await LoanUserStatus.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!status) return res.status(404).json({ message: 'LoanUserStatus not found' });

        // Update the related LoanUser's status
        await LoanUser.findByIdAndUpdate(status.loanUserId, { status: status.status }, { new: true });

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
