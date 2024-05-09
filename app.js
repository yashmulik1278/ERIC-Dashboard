const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'frontend')));

const { generateBatteryLevel, generateOperationalStatus, generateActivityLog } = require('../support/sampleData');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/src/index.js'));
});

app.get('/api/status', (req, res) => {
    const batteryLevel = generateBatteryLevel(); 
    const operationalStatus = generateOperationalStatus(batteryLevel);
    const activityLog = generateActivityLog(operationalStatus);
    res.json({batteryLevel, operationalStatus, activityLog });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
