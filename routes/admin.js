const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Create a new admin
router.post('/', async (req, res, next) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).json(admin);
    } catch (err) {
        next(err);
    }
});

// Get all users
router.get('/', async (req, res, next) => {
    try {
        const users = await Admin.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
});

// Get a admin by ID
router.get('/:id', async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        res.json(admin);
    } catch (err) {
        next(err);
    }
});

// Update a admin
router.put('/:id', async (req, res, next) => {
    try {
        req.body.dateupdated = Date.now(); // Update the dateupdated field
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        res.json(admin);
    } catch (err) {
        next(err);
    }
});

// Delete a admin
router.delete('/:id', async (req, res, next) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        res.json({ message: 'Admin deleted' });
    } catch (err) {
        next(err);
    }
});

// Admin login (password verification)
router.post('/login', async (req, res, next) => {
    try {
        const { loginid, password } = req.body;
        const admin = await Admin.findOne({ loginid });
        if (!admin) return res.status(400).json({ message: 'Invalid login ID' });

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        res.json({ message: 'Login successful', admin });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
