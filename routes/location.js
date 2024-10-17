const express = require("express");
const router = express.Router();
const Location = require("../models/Location");

// Create Location
router.post('/', async (req, res, next) => {
    try {
        const locationData = new Location(req.body);  // Use req.body directly
        await locationData.save();  // Use async/await for save operation
        res.status(201).json({ message: "New Location Created Successfully.", data: locationData });
    } catch (err) {
        next(err);  // Forward the error to the error-handling middleware
    }
});

// Get All Locations
router.get('/', async (req, res, next) => {
    try {
        const locations = await Location.find().lean();  // Use async/await and lean() for performance
        res.status(200).json({ data: locations });
    } catch (err) {
        next(err);  // Forward the error to the error-handling middleware
    }
});

// Get a location by ID
router.get('/:id', async (req, res, next) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) return res.status(404).json({ message: 'Location not found' });
        res.json(location);
    } catch (err) {
        next(err);
    }
});

// Update a location
router.put('/:id', async (req, res, next) => {
    try {
        const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!location) return res.status(404).json({ message: 'Location not found' });
        res.json(location);
    } catch (err) {
        next(err);
    }
});

// Delete a location
router.delete('/:id', async (req, res, next) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);
        if (!location) return res.status(404).json({ message: 'Location not found' });
        res.json({ message: 'Location deleted' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
