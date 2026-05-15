/* ===================================================== */
/* ===== DX-OS AUDIO ENGINE ============================ */
/* ===================================================== */

/* ===== AUDIO CONTEXT ===== */
let audioContext;

/* ===== CW SPELAS ===== */
let isPlaying = false;

/* ===== STARTA AUDIO ===== */
function initAudio(){

    /* ===== FINNS EJ ===== */
    if(!audioContext){

        /* ===== SKAPA ===== */
        audioContext =
        new(window.AudioContext ||
        window.webkitAudioContext)();

    }

}

/* ===== MORSETABELL ===== */
const morseTable = {

    "A":".-",
    "B":"-...",
    "C":"-.-.",
    "D":"-..",
    "E":".",
    "F":"..-.",
    "G":"--.",
    "H":"....",
    "I":"..",
    "J":".---",
    "K":"-.-",
    "L":".-..",
    "M":"--",
    "N":"-.",
    "O":"---",
    "P":".--.",
    "Q":"--.-",
    "R":".-.",
    "S":"...",
    "T":"-",
    "U":"..-",
    "V":"...-",
    "W":".--",
    "X":"-..-",
    "Y":"-.--",
    "Z":"--..",

    "1":".----",
    "2":"..---",
    "3":"...--",
    "4":"....-",
    "5":".....",
    "6":"-....",
    "7":"--...",
    "8":"---..",
    "9":"----.",
    "0":"-----",

    " ":"/"

};

/* ===== TON ===== */
function playTone(duration){

    /* ===== AUDIO ===== */
    initAudio();

    /* ===== OSCILLATOR ===== */
    const oscillator =
    audioContext.createOscillator();

    /* ===== VOLUME ===== */
    const gainNode =
    audioContext.createGain();

    /* ===== FREKVENS ===== */
    oscillator.frequency.value = 650;

    /* ===== VÅGFORM ===== */
    oscillator.type = "sine";

    /* ===== VOLYM ===== */
    gainNode.gain.value = 0.2;

    /* ===== KOPPLA ===== */
    oscillator.connect(gainNode);

    gainNode.connect(audioContext.destination);

    /* ===== START ===== */
    oscillator.start();

    /* ===== STOP ===== */
    oscillator.stop(
        audioContext.currentTime +
        duration
    );

}

/* ===== VÄNTA ===== */
function sleep(ms){

    /* ===== PROMISE ===== */
    return new Promise(resolve =>
        setTimeout(resolve,ms)
    );

}

/* ===== BLINK ===== */
function flashSignal(active){

    /* ===== BOX ===== */
    const flashBox =
    document.getElementById("flashBox");

    /* ===== FINNS EJ ===== */
    if(!flashBox){
        return;
    }

    /* ===== AKTIV ===== */
    if(active){

        flashBox.classList.add(
            "flash-active"
        );

    }

    /* ===== AV ===== */
    else{

        flashBox.classList.remove(
            "flash-active"
        );

    }

}

/* ===== SPELA MORSE ===== */
async function playMorse(text,wpm = 15){

    /* ===== REDAN IGÅNG ===== */
    if(isPlaying){
        return;
    }

    /* ===== STATUS ===== */
    isPlaying = true;

    /* ===== STATUSRUTA ===== */
    const status =
    document.getElementById("statusText");

    /* ===== STATUS ===== */
    if(status){

        status.innerHTML =
        "▶ Spelar Morse...";

    }

    /* ===== TID ===== */
    const dotDuration =
    1200 / wpm;

    /* ===== TEXT ===== */
    text =
    text.toUpperCase();

    /* ===== LOOP TEXT ===== */
    for(let character of text){

        /* ===== MORSE ===== */
        const morse =
        morseTable[character];

        /* ===== FINNS EJ ===== */
        if(!morse){
            continue;
        }

        /* ===== MELLANRUM ===== */
        if(character === " "){

            await sleep(dotDuration * 7);

            continue;

        }

        /* ===== LOOP SYMBOLER ===== */
        for(let symbol of morse){

            /* ===== DOT ===== */
            if(symbol === "."){

                /* ===== BLINK ===== */
                flashSignal(true);

                /* ===== TON ===== */
                playTone(
                    dotDuration / 1000
                );

                /* ===== VÄNTA ===== */
                await sleep(dotDuration);

                /* ===== AV ===== */
                flashSignal(false);

            }

            /* ===== DASH ===== */
            if(symbol === "-"){

                /* ===== BLINK ===== */
                flashSignal(true);

                /* ===== TON ===== */
                playTone(
                    (dotDuration * 3) / 1000
                );

                /* ===== VÄNTA ===== */
                await sleep(dotDuration * 3);

                /* ===== AV ===== */
                flashSignal(false);

            }

            /* ===== MELLAN SYMBOLER ===== */
            await sleep(dotDuration);

        }

        /* ===== MELLAN BOKSTÄVER ===== */
        await sleep(dotDuration * 2);

    }

    /* ===== KLAR ===== */
    isPlaying = false;

    /* ===== STATUS ===== */
    if(status){

        status.innerHTML =
        "✅ Morse färdigspelad";

    }

}
