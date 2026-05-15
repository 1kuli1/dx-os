/* ===================================================== */
/* ===== DX-OS SPECTRUM ENGINE ========================= */
/* ===================================================== */

/* ===== AUDIO CONTEXT ===== */
let spectrumAudioContext;

/* ===== ANALYSATOR ===== */
let spectrumAnalyser;

/* ===== DATA ===== */
let spectrumDataArray;

/* ===== BUFFER ===== */
let spectrumBufferLength;

/* ===== ANIMATION ===== */
let spectrumAnimationId;

/* ===================================================== */
/* ===== INITIERA SPECTRUM ============================= */
/* ===================================================== */

async function initSpectrum(audioElementId,canvasId){

    /* ===== AUDIO ===== */
    const audio =
    document.getElementById(audioElementId);

    /* ===== CANVAS ===== */
    const canvas =
    document.getElementById(canvasId);

    /* ===== KONTROLL ===== */
    if(!audio || !canvas){

        console.error(
            "Audio eller spectrum-canvas saknas."
        );

        return;

    }

    /* ===== CONTEXT ===== */
    spectrumAudioContext =
    new(window.AudioContext ||
    window.webkitAudioContext)();

    /* ===== ANALYSATOR ===== */
    spectrumAnalyser =
    spectrumAudioContext.createAnalyser();

    /* ===== FFT ===== */
    spectrumAnalyser.fftSize = 2048;

    /* ===== BUFFER ===== */
    spectrumBufferLength =
    spectrumAnalyser.frequencyBinCount;

    /* ===== ARRAY ===== */
    spectrumDataArray =
    new Uint8Array(
        spectrumBufferLength
    );

    /* ===== SOURCE ===== */
    const source =
    spectrumAudioContext
    .createMediaElementSource(audio);

    /* ===== KOPPLA ===== */
    source.connect(
        spectrumAnalyser
    );

    spectrumAnalyser.connect(
        spectrumAudioContext.destination
    );

    /* ===== STARTA ===== */
    drawSpectrum(canvasId);

    /* ===== LOGG ===== */
    console.log(
        "DX-OS Spectrum Engine started"
    );

}

/* ===================================================== */
/* ===== RITA SPECTRUM ================================= */
/* ===================================================== */

function drawSpectrum(canvasId){

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
        spectrumAnimationId =
        requestAnimationFrame(draw);

        /* ===== HÄMTA DATA ===== */
        spectrumAnalyser
        .getByteFrequencyData(
            spectrumDataArray
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

        /* ===== BARBREDD ===== */
        const barWidth =
        (width / spectrumBufferLength) * 2.5;

        /* ===== POSITION ===== */
        let x = 0;

        /* ===== LOOP ===== */
        for(let i = 0;
            i < spectrumBufferLength;
            i++){

            /* ===== HÖJD ===== */
            const barHeight =
            spectrumDataArray[i];

            /* ===== FÄRG ===== */
            const red =
            200 + (barHeight / 4);

            const green =
            120 + (barHeight / 3);

            /* ===== FÄRG ===== */
            canvasContext.fillStyle =
            "rgb(" +
            red +
            "," +
            green +
            ",0)";

            /* ===== RITA ===== */
            canvasContext.fillRect(
                x,
                height - barHeight / 1.5,
                barWidth,
                barHeight / 1.5
            );

            /* ===== FLYTTA ===== */
            x +=
            barWidth + 1;

        }

    }

    /* ===== STARTA ===== */
    draw();

}

/* ===================================================== */
/* ===== STOPPA ======================================== */
/* ===================================================== */

function stopSpectrum(){

    /* ===== STOP ===== */
    if(spectrumAnimationId){

        cancelAnimationFrame(
            spectrumAnimationId
        );

    }

    /* ===== LOGG ===== */
    console.log(
        "DX-OS Spectrum stopped"
    );

}

/* ===================================================== */
/* ===== LOGG ========================================== */
/* ===================================================== */

console.log(
    "DX-OS Spectrum Engine loaded"
);
