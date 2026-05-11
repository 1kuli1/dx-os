// ============================================
// DX-OS AUDIO ENGINE
// Filnamn: audio-engine.js
// ============================================

// --------------------------------------------
// Variabler för ljudhantering
// --------------------------------------------

// Sparar MediaRecorder-objektet
let mediaRecorder;

// Sparar inkommande ljuddata i små delar
let audioChunks = [];

// Sparar ljudströmmen från mikrofon/systemljud
let audioStream;

// Sparar URL till inspelad fil
let audioURL;

// Sparar senaste blobben
let audioBlob;

// ============================================
// STARTA INSPELNING
// ============================================

async function startRecording() {

    // Rensa gammal ljuddata
    audioChunks = [];

    try {

        // Hämtar ljud från vald ljudkälla
        audioStream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        // Skapar ny MediaRecorder
        mediaRecorder = new MediaRecorder(audioStream);

        // När ny ljuddata kommer in
        mediaRecorder.ondataavailable = event => {

            // Lägger till ljudbit i array
            audioChunks.push(event.data);

        };

        // När inspelningen stoppas
        mediaRecorder.onstop = () => {

            // Skapar ljudblob av alla delar
            audioBlob = new Blob(audioChunks, {
                type: 'audio/webm'
            });

            // Skapar lokal URL till ljudfilen
            audioURL = URL.createObjectURL(audioBlob);

            // Skriver ut i konsolen
            console.log("Inspelning klar");

            // Visar URL
            console.log(audioURL);

        };

        // Startar inspelning
        mediaRecorder.start();

        // Meddelande i konsolen
        console.log("Inspelning startad");

    }

    // Fångar fel
    catch (error) {

        // Skriver ut fel
        console.error("Fel vid inspelning:", error);

    }

}

// ============================================
// STOPPA INSPELNING
// ============================================

function stopRecording() {

    // Kontroll att recorder finns
    if (mediaRecorder) {

        // Stoppar inspelning
        mediaRecorder.stop();

        // Stoppar alla ljudspår
        audioStream.getTracks().forEach(track => {

            // Stoppar spåret
            track.stop();

        });

        // Meddelande
        console.log("Inspelning stoppad");

    }

}

// ============================================
// SPELA UPP INSPELNING
// ============================================

function playRecording() {

    // Kontroll att ljud finns
    if (audioURL) {

        // Skapar nytt audio-objekt
        const audio = new Audio(audioURL);

        // Spelar upp ljud
        audio.play();

        // Meddelande
        console.log("Spelar upp inspelning");

    }

    else {

        // Meddelande om ingen inspelning finns
        console.log("Ingen inspelning att spela upp");

    }

}

// ============================================
// LADDA NER INSPELNING
// ============================================

function downloadRecording(filename = "dx-recording.webm") {

    // Kontroll att blob finns
    if (audioBlob) {

        // Skapar osynlig länk
        const link = document.createElement("a");

        // Sätter filens URL
        link.href = audioURL;

        // Sätter filnamn
        link.download = filename;

        // Simulerar klick
        link.click();

        // Meddelande
        console.log("Nedladdning startad");

    }

    else {

        // Meddelande om ingen inspelning finns
        console.log("Ingen inspelning att ladda ner");

    }

}

// ============================================
// HÄMTA STATUS
// ============================================

function isRecording() {

    // Returnerar true om inspelning pågår
    return mediaRecorder && mediaRecorder.state === "recording";

}
