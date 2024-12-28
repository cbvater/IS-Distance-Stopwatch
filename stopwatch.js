function createStopwatch() {
    const container = document.getElementById("stopwatches");

    const stopwatchDiv = document.createElement("div");
    stopwatchDiv.className = "stopwatch";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Stopwatch Name";
    nameInput.style.fontSize = "16px";
    nameInput.style.marginRight = "10px";

    const mainDisplay = document.createElement("span");
    mainDisplay.textContent = "00:00.00";
    mainDisplay.style.fontSize = "20px";
    mainDisplay.style.marginRight = "10px";

    const startButton = document.createElement("button");
    startButton.textContent = "Start";

    const stopButton = document.createElement("button");
    stopButton.textContent = "Stop";

    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset";

    const lapButton = document.createElement("button");
    lapButton.textContent = "Lap";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    const lapList = document.createElement("ul");

    stopwatchDiv.appendChild(nameInput);
    stopwatchDiv.appendChild(mainDisplay);
    stopwatchDiv.appendChild(startButton);
    stopwatchDiv.appendChild(stopButton);
    stopwatchDiv.appendChild(resetButton);
    stopwatchDiv.appendChild(lapButton);
    stopwatchDiv.appendChild(deleteButton);
    stopwatchDiv.appendChild(lapList);
    container.appendChild(stopwatchDiv);

    let mainTimer = null;
    let mainMilliseconds = 0;

    let currentLapMilliseconds = 0;
    let lapTimer = null;
    let currentLap = 0;

    function formatTime(totalMilliseconds) {
        const totalSeconds = Math.floor(totalMilliseconds / 100);
        const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
        const secs = String(totalSeconds % 60).padStart(2, "0");
        const hundredths = String(totalMilliseconds % 100).padStart(2, "0");
        return `${mins}:${secs}.${hundredths}`;
    }

    function updateMainDisplay() {
        mainDisplay.textContent = formatTime(mainMilliseconds);
    }

    function updateLapDisplay(lapItem, lapMilliseconds) {
        lapItem.textContent = `Lap ${currentLap}: ${formatTime(lapMilliseconds)}`;
    }

    startButton.onclick = () => {
        if (!mainTimer) {
            mainTimer = setInterval(() => {
                mainMilliseconds++;
                updateMainDisplay();
            }, 10);

            // Start the first lap when the stopwatch starts
            if (!lapTimer) {
                currentLap++;
                const lapItem = document.createElement("li");
                lapItem.textContent = `Lap ${currentLap}: 00:00.00`;
                lapList.appendChild(lapItem);

                lapTimer = setInterval(() => {
                    currentLapMilliseconds++;
                    updateLapDisplay(lapItem, currentLapMilliseconds);
                }, 10);
            }
        }
    };

    stopButton.onclick = () => {
        clearInterval(mainTimer);
        clearInterval(lapTimer);
        mainTimer = null;
        lapTimer = null;
    };

    resetButton.onclick = () => {
        clearInterval(mainTimer);
        clearInterval(lapTimer);
        mainTimer = null;
        lapTimer = null;
        mainMilliseconds = 0;
        currentLapMilliseconds = 0;
        currentLap = 0;
        updateMainDisplay();
        lapList.innerHTML = ""; // Clear all laps
    };

    lapButton.onclick = () => {
        if (lapTimer) {
            clearInterval(lapTimer);
            lapTimer = null;

            // Record the next lap
            currentLapMilliseconds = 0;
            currentLap++;
            const lapItem = document.createElement("li");
            lapItem.textContent = `Lap ${currentLap}: 00:00.00`;
            lapList.appendChild(lapItem);

            // Start the new lap
            lapTimer = setInterval(() => {
                currentLapMilliseconds++;
                updateLapDisplay(lapItem, currentLapMilliseconds);
            }, 10);
        }
    };

    deleteButton.onclick = () => {
        clearInterval(mainTimer);
        clearInterval(lapTimer);
        stopwatchDiv.remove();
    };
}

window.onload = () => {
    const addStopwatchButton = document.createElement("button");
    addStopwatchButton.id = "addStopwatch";
    addStopwatchButton.textContent = "Add New Stopwatch";
    addStopwatchButton.onclick = createStopwatch;
    document.body.appendChild(addStopwatchButton);

    const stopwatchesContainer = document.createElement("div");
    stopwatchesContainer.id = "stopwatches";
    document.body.appendChild(stopwatchesContainer);
};
