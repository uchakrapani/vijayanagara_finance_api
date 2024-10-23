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
        const loanuser = await LoanUser.find().populate('loanUserStatus').lean();  // Use async/await and lean() for performance
        res.status(200).json(loanuser);
    } catch (err) {
        next(err);  // Forward the error to the error-handling middleware
    }
});

// Get a loanuser by ID
router.get('/:id', async (req, res, next) => {
    try {
        const loanuser = await LoanUser.findById(req.params.id).populate('loanUserStatus');
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

// Login Endpoint
router.post('/login', async (req, res, next) => {
    try {
        const { loginId, password } = req.body;

        // Ensure loginId and password are provided
        if (!loginId || !password) {
            return res.status(400).json({ message: 'Login ID and password are required.' });
        }

        // Find user by loginId
        const user = await LoanUser.findOne({ loginId });
        if (!user) {
            return res.status(401).json({ message: 'Invalid login ID or password.' });
        }

        // Compare provided password with stored hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid login ID or password.' });
        }

        // If successful, you can return a success message or token
        res.status(200).json({ message: 'Login successful!', user });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
