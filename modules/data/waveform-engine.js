/* ===================================================== */
/* ===== DX-OS WAVEFORM ENGINE ========================= */
/* ===================================================== */

/* ===== AUDIO CONTEXT ===== */
let waveformAudioContext;

/* ===== ANALYSATOR ===== */
let waveformAnalyser;

/* ===== DATA ARRAY ===== */
let waveformDataArray;

/* ===== BUFFER LENGTH ===== */
let waveformBufferLength;

/* ===== ANIMATION ===== */
let waveformAnimationId;

/* ===================================================== */
/* ===== INITIERA WAVEFORM ============================= */
/* ===================================================== */

async function initWaveform(audioElementId,canvasId){

    /* ===== AUDIO ===== */
    const audio =
    document.getElementById(audioElementId);

    /* ===== CANVAS ===== */
    const canvas =
    document.getElementById(canvasId);

    /* ===== KONTROLL ===== */
    if(!audio || !canvas){

        console.error(
            "Audio eller canvas saknas."
        );

        return;

    }

    /* ===== CONTEXT ===== */
    waveformAudioContext =
    new(window.AudioContext ||
    window.webkitAudioContext)();

    /* ===== ANALYSATOR ===== */
    waveformAnalyser =
    waveformAudioContext.createAnalyser();

    /* ===== FFT ===== */
    waveformAnalyser.fftSize = 2048;

    /* ===== BUFFER ===== */
    waveformBufferLength =
    waveformAnalyser.frequencyBinCount;

    /* ===== ARRAY ===== */
    waveformDataArray =
    new Uint8Array(
        waveformBufferLength
    );

    /* ===== SOURCE ===== */
    const source =
    waveformAudioContext
    .createMediaElementSource(audio);

    /* ===== KOPPLA ===== */
    source.connect(
        waveformAnalyser
    );

    waveformAnalyser.connect(
        waveformAudioContext.destination
    );

    /* ===== STARTA RITNING ===== */
    drawWaveform(canvasId);

    /* ===== LOGG ===== */
    console.log(
        "DX-OS Waveform Engine started"
    );

}

/* ===================================================== */
/* ===== RITA WAVEFORM ================================ */
/* ===================================================== */

function drawWaveform(canvasId){

    /* ===== CANVAS ===== */
    const canvas =
    document.getElementById(canvasId);

    /* ===== KONTROLL ===== */
    if(!canvas){

        return;

    }

    /* ===== CONTEXT ===== */
    const canvasContext =
    canvas.getContext("2d");

    /* ===== BREDD ===== */
    const width =
    canvas.width;

    /* ===== HÖJD ===== */
    const height =
    canvas.height;

    /* ===== LOOP ===== */
    function draw(){

        /* ===== FRAME ===== */
        waveformAnimationId =
        requestAnimationFrame(draw);

        /* ===== HÄMTA DATA ===== */
        waveformAnalyser
        .getByteTimeDomainData(
            waveformDataArray
        );

        /* ===== BAKGRUND ===== */
        canvasContext.fillStyle =
        "#020617";

        canvasContext.fillRect(
            0,
            0,
            width,
            height
        );

        /* ===== LINJE ===== */
        canvasContext.lineWidth = 2;

        /* ===== FÄRG ===== */
        canvasContext.strokeStyle =
        "#eab308";

        /* ===== START ===== */
        canvasContext.beginPath();

        /* ===== SLICE ===== */
        const sliceWidth =
        width /
        waveformBufferLength;

        /* ===== X ===== */
        let x = 0;

        /* ===== LOOP ===== */
        for(let i = 0;
            i < waveformBufferLength;
            i++){

            /* ===== NORMALISERA ===== */
            const v =
            waveformDataArray[i] / 128.0;

            /* ===== POSITION ===== */
            const y =
            v * height / 2;

            /* ===== START ===== */
            if(i === 0){

                canvasContext.moveTo(
                    x,
                    y
                );

            }

            /* ===== LINJE ===== */
            else{

                canvasContext.lineTo(
                    x,
                    y
                );

            }

            /* ===== FLYTTA ===== */
            x += sliceWidth;

        }

        /* ===== SLUT ===== */
        canvasContext.lineTo(
            width,
            height / 2
        );

        /* ===== RITA ===== */
        canvasContext.stroke();

    }

    /* ===== STARTA ===== */
    draw();

}

/* ===================================================== */
/* ===== STOPPA WAVEFORM =============================== */
/* ===================================================== */

function stopWaveform(){

    /* ===== STOP ===== */
    if(waveformAnimationId){

        cancelAnimationFrame(
            waveformAnimationId
        );

    }

    /* ===== LOGG ===== */
    console.log(
        "DX-OS Waveform stopped"
    );

}

/* ===================================================== */
/* ===== LOGG ========================================== */
/* ===================================================== */

console.log(
    "DX-OS Waveform Engine loaded"
);
