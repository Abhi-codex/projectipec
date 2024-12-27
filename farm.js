
function activateBox(selectedBox) {
    // Get all boxes
    const boxes = document.querySelectorAll('.box');

    // Remove the active class from all boxes
    boxes.forEach(box => box.classList.remove('active'));

    // Add the active class to the clicked box
    selectedBox.classList.add('active');
}


// // Handle Watering Schedule Form Submission
// document.getElementById("schedule-form").addEventListener("submit", function(event) {
//     event.preventDefault();
//     const startTime = document.getElementById("start-time").value;
//     const endTime = document.getElementById("end-time").value;
//     alert(`Watering schedule saved:\nStart Time: ${startTime}\nEnd Time: ${endTime}`);
// });

// // Handle Sensor Calibration Form Submission
// document.getElementById("calibration-form").addEventListener("submit", function(event) {
//     event.preventDefault();
//     const soilMoisture = document.getElementById("soil-moisture").value;
//     const temperature = document.getElementById("temperature").value;
//     alert(`Calibration values saved:\nSoil Moisture: ${soilMoisture}%\nTemperature: ${temperature}°C`);
// });

// Handle Alert Settings Form Submission
// document.getElementById("alert-form").addEventListener("submit", function(event) {
//     event.preventDefault();
//     const moistureAlert = document.getElementById("moisture-alert").value;
//     const temperatureAlert = document.getElementById("temperature-alert").value;
//     const waterAlert = document.getElementById("water-alert").value;
//     alert(`Alert thresholds saved:\nSoil Moisture: ${moistureAlert}%\nTemperature: ${temperatureAlert}°C\nWater Level: ${waterAlert}%`);
// });


// function updateMoistureLevel(moistureValue) {
//     document.getElementById("soil-moisture").textContent = moistureValue + "%";
// }



// Fetch data from the server
async function fetchRPMData() {
    try {
        const response = await fetch('https://cybernation.onrender.com/data'); // Replace with your server URL
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        updateRPMValue(data);
    } catch (error) {
        console.error('Error fetching RPM data:', error);
        const rpmElement = document.getElementById('rpmValue');
        if (rpmElement) {
            rpmElement.textContent = 'Error loading RPM';
        }
    }
}

// Update the RPM value on the page
function updateRPMValue(data) {
    const rpmElement = document.getElementById('rpmValue');
    if (!rpmElement) {
        console.error('Element with id "rpmValue" not found.');
        return; // Exit if the element is missing
        console.log('rpmValue element:', document.getElementById('rpmValue'));

    }

    if (data && data.length > 0) {
        const latestRecord = data[data.length - 1]; // Get the last record
        const rpm = latestRecord.rpm;
        rpmElement.textContent = `${rpm} ADC`;
    } else {
        rpmElement.textContent = 'No data available';
    }
}

// Fetch and display RPM when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const rpmElement = document.getElementById('rpmValue');
    if (!rpmElement) {
        console.error('Element with id "rpmValue" not found during DOMContentLoaded.');
        return; // Exit if the element is missing
    }
    fetchRPMData();
});

// Fetch and update RPM every 5 seconds
setInterval(fetchRPMData, 5000); // Refresh every 5 seconds
