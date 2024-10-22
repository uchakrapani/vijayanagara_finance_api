const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb'); // Import MongoClient
const router = express.Router();

const uri = 'your_mongodb_connection_string'; // Replace with your MongoDB connection string
const dbName = 'lbcvfloandb'; // Replace with your actual database name
const backupFolder = path.join(__dirname, '../backups'); // Backup folder in the root directory

// Define the backup route
router.post('/', async (req, res) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Create a timestamp for the file name
    const logFile = path.join(backupFolder, `backup-log-${timestamp}.txt`); // Log file path

    // Ensure the backup folder exists
    fs.mkdirSync(backupFolder, { recursive: true });

    // Connect to MongoDB
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collections = await db.listCollections().toArray(); // This verifies the connection and lists collections

        // Construct the command to take backup
        const command = `mongodump --db ${dbName} --out ${backupFolder}`;

        // Execute the backup command
        exec(command, (error, stdout, stderr) => {
            // Log stdout and stderr to the log file
            fs.appendFileSync(logFile, `STDOUT:\n${stdout}\n\nSTDERR:\n${stderr}\n`);
            
            if (error) {
                console.error(`Error during backup: ${error.message}`);
                return res.status(500).json({ message: 'Backup failed', error: error.message });
            }
            
            res.status(200).json({ message: 'Backup completed successfully', logFile: logFile });
        });
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        res.status(500).json({ message: 'Database connection failed', error: error.message });
    } finally {
        await client.close(); // Ensure the client is closed after the operation
    }
});

module.exports = router;
