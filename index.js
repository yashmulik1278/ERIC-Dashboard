document.addEventListener('DOMContentLoaded', () => {
    // Fetch data when DOM is loaded
    fetchBatteryLevelAndStatus();
    const dropdown = document.getElementById('data-view');
     
    // Function to handle dropdown change event
    dropdown.addEventListener('change', () => {
        const selectedOption = dropdown.value;
        
        if (selectedOption === 'overview') {
            fetchBatteryLevelAndStatus();
            refreshButton.style.display = 'block';
        } else if (selectedOption === 'performance') {
            fetchPerformanceData();
            refreshButton.style.display = 'none';
        } else {
            fetchErrorData();
            refreshButton.style.display = 'none';
        }
    });
    
    // Refresh button event listener
    const refreshButton = document.getElementById('refresh-btn');
    refreshButton.addEventListener('click', () => {
        location.reload(); 
    });
});

function fetchBatteryLevelAndStatus() {
    fetch('/api/status')
        .then(response => response.json())
        .then(data => {
            const batteryLevelElement = document.getElementById('battery-level');
            batteryLevelElement.textContent = `${data.batteryLevel}%`;
            const operationalStatusElement = document.getElementById('operational-status');
            operationalStatusElement.textContent = data.operationalStatus;
            const activityLogElement = document.getElementById('activity-log');
            activityLogElement.innerHTML = '';
            const logItem = document.createElement('li');
            logItem.textContent = `${data.activityLog.timeStamp}: ${data.activityLog.description}`;
            activityLogElement.appendChild(logItem);
        })
        .catch(error => console.error('Error fetching battery level and Status:', error));
}

function fetchPerformanceData() {
    const batteryLevelElement = document.getElementById('battery-level');
    const operationalStatusElement = document.getElementById('operational-status');
    const activityLogElement = document.getElementById('activity-log');
    
    // Generate performance data
    const performanceData = {
        batteryLevel: Array(20).fill(0).map(() => generateBatteryLevel()),
        operationalStatus: Array(20).fill(0).map(() => "idle"), // Assuming status code is always "idle"
        activityLog: Array(20).fill(0).map(() => generateActivityLog("idle")) // Generating activity log with status code "idle"
    };
    
    // Display performance data
    batteryLevelElement.innerHTML = performanceData.batteryLevel.map(level => `<li>${level}%</li>`).join('');
    operationalStatusElement.innerHTML = performanceData.operationalStatus.map(status => `<li>${status}</li>`).join('');
    activityLogElement.innerHTML = performanceData.activityLog.map(log => `<li>${log.timeStamp}: ${log.description}</li>`).join('');
}


// Function to generate random battery level
function generateBatteryLevel() {
    return Math.floor(Math.random() * 101);
}

// Function to generate activity log with random timestamp and description
const generateActivityLog = () => {
    const timeStamp = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(); // Generate a random timestamp within the past 10000 seconds
    return { timeStamp, description: "Task Done" };
};

function fetchErrorData() {
    const batteryLevelElement = document.getElementById('battery-level');
    const operationalStatusElement = document.getElementById('operational-status');
    const activityLogElement = document.getElementById('activity-log');

    // Generate Error Data
    const errorData = {
        batteryLevel: Array(20).fill(0).map(() => generateBatteryLevel()),
        operationalStatus: Array(20).fill(0).map(() => "idle"), // Assuming status code is always "idle"
        activityLog: Array(20).fill(0).map(() => generateActivityLog2("idle")) // Generating activity log with status code "idle"
    };

    // Display error data
    batteryLevelElement.innerHTML = errorData.batteryLevel.map(level => `<li>${level}%</li>`).join('');
    operationalStatusElement.innerHTML = errorData.operationalStatus.map(status => `<li>${status}</li>`).join('');
    activityLogElement.innerHTML = errorData.activityLog.map(log => `<li>${log.timeStamp}: ${log.description}</li>`).join('');
}

const generateActivityLog2 = () => {
    const timeStamp = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(); // Generate a random timestamp within the past 10000 seconds
    return { timeStamp, description: "Task failed" };
};
