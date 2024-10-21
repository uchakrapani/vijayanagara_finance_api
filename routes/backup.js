const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Define the backup route
router.post('/backup', (req, res) => {
    const dbName = 'lbcvfloandb'; // Replace with your actual database name
    const backupFolder = path.join(__dirname, '../backups'); // Backup folder in the root directory
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Create a timestamp for the file name
    const logFile = path.join(backupFolder, `backup-log-${timestamp}.txt`); // Log file path

    // Ensure the backup folder exists
    fs.mkdirSync(backupFolder, { recursive: true });

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
});

module.exports = router;
