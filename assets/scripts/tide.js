document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=20230910&end_date=20230911&datum=MLLW&station=8518750&time_zone=lst_ldt&units=english&interval=hilo&format=json";

    let timeout;
    let screensaverActive = false;

    function displayTideInfo(data) {
        const tideInfoElement = document.getElementById("tide-info");
        const now = new Date();

        if (data && data.predictions && data.predictions.length > 0) {
            const tidePredictions = data.predictions;
            let currentTideState = "";
            let nextTideTime = "";
            let nextTideType = "";
            let currentTideLevel = 0; 

            for (let i = 0; i < tidePredictions.length - 1; i++) {
                const currentPredictionTime = new Date(tidePredictions[i].t);
                const nextPredictionTime = new Date(tidePredictions[i + 1].t);

                if (now >= currentPredictionTime && now <= nextPredictionTime) {
                    nextTideTime = tidePredictions[i + 1].t;
                    nextTideType = tidePredictions[i + 1].type;
                    currentTideState = tidePredictions[i].type === "L" ? "rising &#8599;" : "falling &#8600;";
                    
                    const timeDifference = nextPredictionTime - currentPredictionTime;
                    const elapsedTime = now - currentPredictionTime;
                    currentTideLevel = (elapsedTime / timeDifference) * 100;
                    currentTideLevel = tidePredictions[i].type === "L" ? currentTideLevel : 100 - currentTideLevel;
                    
                    nextTideTime = new Date(nextTideTime).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
                    
                    break;
                }
            }
            
            tideInfoElement.innerHTML = `
                <div>
                    The tide is currently ${currentTideState}
                </div>
                <div style="width: 50px; height: 30px; border: 1px solid black; position: relative; padding-top: 10px; padding-bottom: 10px;">
                    <div style="width: 100%; height: ${currentTideLevel}%; background-color: blue; position: absolute; bottom: 0;"></div>
                </div>
                <div>
                    The next ${nextTideType === "H" ? "high-tide" : "low-tide"} is at ${nextTideTime}
                </div>
            `;
        } else {
            tideInfoElement.textContent = "No tide data available.";
        }
    }

    function activateScreensaver() {
        if (!screensaverActive) {
            const existingScreensaver = document.getElementById('screensaver');
            if (!existingScreensaver) {
                html2canvas(document.body).then(canvas => {
                    document.body.appendChild(canvas);
                    // ... (the rest of your existing code)
                    canvas.classList.add('active');
                });
            }
            screensaverActive = true;
        }
    }
    
    function deactivateScreensaver() {
        if (screensaverActive) {
            const screensaver = document.getElementById('screensaver');
            if (screensaver) {
                screensaver.classList.remove('active');
            }
            screensaverActive = false;
        }
        clearTimeout(timeout);
        timeout = setTimeout(activateScreensaver, 3000);
    }

    document.addEventListener("mousemove", deactivateScreensaver);
    document.addEventListener("keypress", deactivateScreensaver);
    document.addEventListener("scroll", deactivateScreensaver);


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayTideInfo(data);
        })
        .catch(error => {
            console.error("Error fetching tide data:", error);
        });

    timeout = setTimeout(activateScreensaver, 3000);
});
