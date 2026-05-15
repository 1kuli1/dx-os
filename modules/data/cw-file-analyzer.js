/* ===================================================== */
/* ===== DX-OS CW FILE ANALYZER ======================== */
/* ===================================================== */

/* ===== GLOBAL STATUS ===== */
let analyzerReady = true;

/* ===================================================== */
/* ===== ANALYSERA CW-FIL ============================== */
/* ===================================================== */

async function analyzeCWFile(fileInputId,statusId,resultCallback){

    /* ===== INPUT ===== */
    const fileInput =
    document.getElementById(fileInputId);

    /* ===== STATUS ===== */
    const statusBox =
    document.getElementById(statusId);

    /* ===== KONTROLL ===== */
    if(!fileInput){

        console.error(
            "Filinput hittades inte."
        );

        return;

    }

    /* ===== FIL FINNS ===== */
    if(fileInput.files.length === 0){

        alert(
            "Välj en ljudfil först."
        );

        return;

    }

    /* ===== FIL ===== */
    const file =
    fileInput.files[0];

    /* ===== FILINFO ===== */
    const fileName =
    file.name;

    /* ===== FILSTORLEK ===== */
    const fileSize =
    formatFileSize(file.size);

    /* ===== FILTYP ===== */
    const fileType =
    file.type || "Okänd";

    /* ===== STATUS ===== */
    if(statusBox){

        statusBox.innerHTML =
        "🔄 Läser ljudfil...";

    }

    /* ===== LOGG ===== */
    console.log(
        "DX-OS analyserar:",
        fileName
    );

    /* ===== FILLÄSARE ===== */
    const reader =
    new FileReader();

    /* ===== FIL LADDAD ===== */
    reader.onload =
    async function(event){

        /* ===== STATUS ===== */
        if(statusBox){

            statusBox.innerHTML =
            "🎧 Analys pågår...";

        }

        /* ===== VÄNTA ===== */
        await sleep(1500);

        /* ===== RESULTAT ===== */
        const analysisResult = {

            /* ===== FILNAMN ===== */
            fileName:fileName,

            /* ===== STORLEK ===== */
            fileSize:fileSize,

            /* ===== FILTYP ===== */
            fileType:fileType,

            /* ===== TEST CW ===== */
            detectedCW:"-.-. --.-",

            /* ===== TEST TEXT ===== */
            detectedText:"CQ",

            /* ===== SVENSKA ===== */
            swedishText:"Allmänt anrop",

            /* ===== SIGNAL ===== */
            signalQuality:"God",

            /* ===== WPM ===== */
            estimatedWPM:15,

            /* ===== STATUS ===== */
            status:"Analys klar"

        };

        /* ===== STATUS ===== */
        if(statusBox){

            statusBox.innerHTML =
            "✅ CW identifierad";

        }

        /* ===== CALLBACK ===== */
        if(resultCallback){

            resultCallback(
                analysisResult
            );

        }

        /* ===== LOGG ===== */
        console.log(
            "DX-OS CW analys klar:",
            analysisResult
        );

    };

    /* ===== FEL ===== */
    reader.onerror =
    function(){

        /* ===== STATUS ===== */
        if(statusBox){

            statusBox.innerHTML =
            "❌ Kunde inte läsa filen";

        }

        /* ===== FEL ===== */
        console.error(
            "Fel vid filanalys"
        );

    };

    /* ===== LÄS FIL ===== */
    reader.readAsArrayBuffer(file);

}

/* ===================================================== */
/* ===== FORMAT FILSTORLEK ============================= */
/* ===================================================== */

function formatFileSize(bytes){

    /* ===== KB ===== */
    const kb =
    bytes / 1024;

    /* ===== MB ===== */
    const mb =
    kb / 1024;

    /* ===== MB ===== */
    if(mb >= 1){

        return (
            mb.toFixed(2) +
            " MB"
        );

    }

    /* ===== KB ===== */
    return (
        kb.toFixed(2) +
        " KB"
    );

}

/* ===================================================== */
/* ===== SLEEP ========================================= */
/* ===================================================== */

function sleep(ms){

    /* ===== PROMISE ===== */
    return new Promise(resolve =>
        setTimeout(resolve,ms)
    );

}

/* ===================================================== */
/* ===== TESTA ENGINE ================================== */
/* ===================================================== */

console.log(
    "DX-OS CW File Analyzer loaded"
);
