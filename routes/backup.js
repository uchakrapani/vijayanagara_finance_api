// routes/backup.js
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const BACKUP_DIR = path.join(__dirname, '../backups'); // Directory to store backups

// Ensure the backup directory exists
if (!fs.existsSync(BACKUP_DIR)){
    fs.mkdirSync(BACKUP_DIR);
}

// POST: Backup MongoDB data to a text file
router.post('/create', async (req, res) => {
    try {
        // Get the list of collections in the database
        const collections = await mongoose.connection.db.listCollections().toArray();
        
        const backupData = {};

        // Loop through each collection and get its data
        for (const collection of collections) {
            const data = await mongoose.connection.db.collection(collection.name).find({}).toArray();
            backupData[collection.name] = data;
        }

        // Define the backup file path
        const filePath = path.join(BACKUP_DIR, `backup_${Date.now()}.txt`);

        // Write the backup data to a text file
        fs.writeFile(filePath, JSON.stringify(backupData, null, 2), (err) => {
            if (err) {
                console.error('Error writing backup file:', err);
                return res.status(500).json({ message: 'Error creating backup file.' });
            }
            res.status(200).json({ message: 'Backup created successfully!', filePath });
        });
    } catch (error) {
        console.error('Error during backup:', error);
        res.status(500).json({ message: 'Error creating backup.' });
    }
});

// GET: Get all backup files
router.get('/', (req, res) => {
    fs.readdir(BACKUP_DIR, (err, files) => {
        if (err) {
            console.error('Error reading backup directory:', err);
            return res.status(500).json({ message: 'Error fetching backup files.' });
        }

        // Filter for only .txt files
        const backupFiles = files.filter(file => file.endsWith('.txt')).map(file => ({
            name: file,
            downloadLink: `${req.protocol}://${req.get('host')}/backups/${file}` // Create download link
        }));

        res.status(200).json({ backups: backupFiles });
    });
});

module.exports = router;
