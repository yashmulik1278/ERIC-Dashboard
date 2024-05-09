const generateBatteryLevel = () => {
    return Math.floor(Math.random() * 101);
};

const generateOperationalStatus = function generateOperationalStatus(batteryLevel){
    if (batteryLevel < 30) {
        return "charging";
    }
    const statuses = ["idle", "active"];
    return statuses[Math.floor(Math.random() * statuses.length)];
};

const generateActivityLog = (operationalStatus) => {
    let description;
    switch (operationalStatus) {
        case "idle":
            description = "Task Performed";
            break;
        case "active":
            description = "Processing";
            break;
        case "charging":
            description = "Idle";
            break;
        default:
            description = "Unknown";
            break;
    }
    const timeStamp = new Date().toISOString();
    return { timeStamp, description };
};


module.exports = {generateBatteryLevel,generateOperationalStatus,generateActivityLog};