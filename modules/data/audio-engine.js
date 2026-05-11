// ============================================
// AUDIO ENGINE
// ============================================

let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioURL;
let audioStream;

// ============================================
// START RECORDING
// ============================================

async function startRecording(){

    try{

        audioChunks = [];

        audioStream =
            await navigator.mediaDevices.getUserMedia({
                audio:true
            });

        mediaRecorder =
            new MediaRecorder(audioStream);

        mediaRecorder.ondataavailable = event => {

            audioChunks.push(event.data);

        };

        mediaRecorder.onstop = () => {

            audioBlob =
                new Blob(audioChunks,{
                    type:"audio/webm"
                });

            audioURL =
                URL.createObjectURL(audioBlob);

            console.log("Inspelning klar");

        };

        mediaRecorder.start();

        console.log("REC START");

    }

    catch(error){

        console.error(error);

        alert("Mikrofonfel: " + error);

    }

}

// ============================================
// STOP RECORDING
// ============================================

function stopRecording(){

    if(mediaRecorder){

        mediaRecorder.stop();

        audioStream.getTracks().forEach(track => {

            track.stop();

        });

        console.log("REC STOP");

    }

}

// ============================================
// PLAY RECORDING
// ============================================

function playRecording(){

    if(audioURL){

        const audio = new Audio(audioURL);

        audio.play();

    }

}

// ============================================
// DOWNLOAD RECORDING
// ============================================

function downloadRecording(){

    if(audioBlob){

        const link =
            document.createElement("a");

        link.href = audioURL;

        link.download = "dx-recording.webm";

        link.click();

    }

}
