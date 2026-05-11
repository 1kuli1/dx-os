// ============================================
// DX-OS LIVE RADIO
// Filnamn: live-radio.js
// ============================================

// --------------------------------------------
// Väntar tills hela sidan laddats klart
// --------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    // Hämtar knappen för start inspelning
    const startButton = document.getElementById("startRecording");

    // Hämtar knappen för stopp inspelning
    const stopButton = document.getElementById("stopRecording");

    // Hämtar knappen för uppspelning
    const playButton = document.getElementById("playRecording");

    // Hämtar knappen för nedladdning
    const downloadButton = document.getElementById("downloadRecording");

    // Hämtar statusfält
    const statusText = document.getElementById("statusText");

    // ========================================
    // STARTA INSPELNING
    // ========================================

    startButton.addEventListener("click", async () => {

        // Uppdaterar status
        statusText.innerText = "Startar inspelning...";

        // Startar inspelning via audio-engine.js
        await startRecording();

        // Kontroll om inspelning fungerar
        if (isRecording()) {

            // Uppdaterar status
            statusText.innerText = "● Inspelning pågår";

            // Gör startknappen inaktiv
            startButton.disabled = true;

            // Aktiverar stoppknappen
            stopButton.disabled = false;

        }

        else {

            // Felstatus
            statusText.innerText = "Kunde inte starta inspelning";

        }

    });

    // ========================================
    // STOPPA INSPELNING
    // ========================================

    stopButton.addEventListener("click", () => {

        // Stoppar inspelning
        stopRecording();

        // Uppdaterar status
        statusText.innerText = "■ Inspelning stoppad";

        // Aktiverar startknapp
        startButton.disabled = false;

        // Inaktiverar stoppknapp
        stopButton.disabled = true;

    });

    // ========================================
    // SPELA UPP INSPELNING
    // ========================================

    playButton.addEventListener("click", () => {

        // Spelar upp senaste inspelning
        playRecording();

        // Status
        statusText.innerText = "▶ Spelar upp inspelning";

    });

    // ========================================
    // LADDA NER INSPELNING
    // ========================================

    downloadButton.addEventListener("click", () => {

        // Skapar tidsstämpel
        const now = new Date();

        // Skapar datumdel
        const datePart =
            now.getFullYear() + "-" +
            String(now.getMonth() + 1).padStart(2, "0") + "-" +
            String(now.getDate()).padStart(2, "0");

        // Skapar tidsdel
        const timePart =
            String(now.getHours()).padStart(2, "0") + "-" +
            String(now.getMinutes()).padStart(2, "0") + "-" +
            String(now.getSeconds()).padStart(2, "0");

        // Bygger filnamn
        const filename = `dx-recording-${datePart}-${timePart}.webm`;

        // Startar nedladdning
        downloadRecording(filename);

        // Status
        statusText.innerText = "⬇ Inspelning nedladdad";

    });

    // ========================================
    // INITIAL STATUS
    // ========================================

    // Startstatus
    statusText.innerText = "Redo för inspelning";

    // Stopknappen skall vara avstängd från början
    stopButton.disabled = true;

});
