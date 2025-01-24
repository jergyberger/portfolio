let bilde = document.getElementById("romBilde");
let spillboks = document.getElementById("spillboks");
let film = document.getElementById("film");
let film2 = document.getElementById("film2");
let video = document.getElementById("video");
let video2 = document.getElementById("video2");
let startKnapp = document.getElementById("startKnapp");
let bakgrunnsmusikk = new Audio("sound/LADR-kort.wav")
let lydikon = document.getElementById("lydikon");

/* 
Creditt to artist:
➞ Artist: Ron Gelinas
➞ Track Title: Journey of Hope (original mix)
➞ Link to Track: youtu.be/pJtQeJYKTRc */

//Kode til startknapp som får filmen introfilm til å starte
startKnapp.onclick = () => {
    film.play();
    startKnapp.style.display = "none";
}

//Bytter ut video med spill etter avspilling
let filmFerdig = film.onended = () => {
    lydikon.style.display = "block";
    film.style.display = "none";
    video.style.display = "none";
    startKnapp.style.display = "none";
    spillboks.style.display = "flex"
    bilde.style.display = "flex";

    //Plasserer lysbryter på en tilfeldig plass og viser dialog med info
    lysbryter.style.visibility = "hidden";
    lysbryter.style.left = (Math.random() * (bilde.width)) + "px";
    lysbryter.style.top = (Math.random() * (bilde.height)) + "px";
    bobleTekst.style.fontSize = "1vw";
    bobleTekst.dataset.text = "Finn lysbryteren og slå på lyset"
    visDialog(bobleTekst)

    //Gjør lysbryter synlig når musepekerern er innenfor gitt avstand
    window.onmousemove = (event) => {
        let rect = lysbryter.getBoundingClientRect();
        let centerX = (rect.right + rect.left) / 2;
        let centerY = (rect.bottom + rect.top) / 2;

        let distance = Math.sqrt(
            Math.pow(centerX - event.clientX, 2) +
            Math.pow(centerY - event.clientY, 2)
        );
        if (distance < 100 && lysbryter.style.visibility == "hidden") {
            lysbryter.style.visibility = "visible";
        }
    };
    //starter bakgrunnsmusikk og spiller den på repeat
    bakgrunnsmusikk.play()
    bakgrunnsmusikk.volume = 0.4;
    let repeat = bakgrunnsmusikk.onended = () => {
        bakgrunnsmusikk.play()
        repeat;
    }
}

//Lysbryter
//#region 
let lysbryter = document.getElementById("lysbryter");
let mySound;

lysbryter.style.position = "absolute";
lysbryter.style.visibility = "hidden";
lysbryter.style.left = (Math.random() * (bilde.width)) + "px";
lysbryter.style.top = (Math.random() * (bilde.height)) + "px";

//Åpner første rom når man trykker på lysbryter, spiller av lydeffekt og viser dialog med info
lysbryter.onclick = () => {
    mySound = new Audio("sound/lysbryter1.wav");
    mySound.play();
    bilde.src = "pictures/stueTVoff.png";
    bilde.useMap = "#stueMap"
    lysbryter.style.visibility = "hidden";
    spillboks.removeChild(lysbryter);
    bobleTekst.dataset.text = "Jeg husker ingenting fra i går og har ingen idé om hvor jeg er. Nå er det bare å komme seg hjem og tilbringe resten av dagen i senga! Skulle du stå fast, kan du til enhver tid trykke på den røde koppen øverst i venstre hjørne for å få et hint."
    visDialog(bobleTekst);
};

//Mulighet for å skru bakgrunnsmusikk av og på med ikoner i venstre hjørne
let lydAvPaa = document.getElementById("lydikon");
let lydAv = false;
lydAvPaa.onclick = () => {
    if (!lydAv) {
        bakgrunnsmusikk.pause();
        lydAvPaa.innerText = "🔈";
        lydAv = true;
    }
    else {
        bakgrunnsmusikk.play();
        lydAvPaa.innerText = "🔇";
        lydAv = false;
    }

}
//#endregion
//Denne skalerer mapping av bildet etter zoom, noe som gjør at spillet fungerer på ulike skjermstørrelser
//#region 
lysbryter.onmouseup = function () {
    let mapId = document.querySelector("#romBilde").useMap;
    let ImageMap = function (map) {
        let n,
            areas = document.getElementsByTagName('area'),
            len = areas.length,
            coords = [];

        let previousWidth = 1280; /* document.querySelector("#romBilde").width */;
        for (n = 0; n < len; n++) {
            coords[n] = areas[n].coords.split(',');
        }
        this.resize = function () {
            let n, m, clen,
                x = bilde.width / previousWidth;
            for (n = 0; n < len; n++) {
                clen = coords[n].length;
                for (m = 0; m < clen; m++) {
                    coords[n][m] *= x;
                }
                areas[n].coords = coords[n].join(',');
            }
            previousWidth = bilde.width;
            return true;
        };
        window.onresize = this.resize;

    },
        imageMap = new ImageMap(document.getElementById(mapId));
    imageMap.resize();
}
//#endregion
//HER STARTER STUE
//#region 
//Kode til TV/fjernkontroll - skrur av og på TV
let tvStatus = false;
function tvOn() {
    if (tvStatus === false) {
        document.getElementById("romBilde").src = "pictures/stueTVon.png"
        tvStatus = true;
    }
    else {
        document.getElementById("romBilde").src = "pictures/stueTVoff.png"
        tvStatus = false;
    }
}


//Kode til vinflaske
//Kode til popup-funskjon på vinflaske
let modal = document.getElementById("myModal");
let vinflaske = document.getElementById("vinflaske");
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");
vinflaske.onclick = function () {
    modal.style.display = "block";
    modalImg.src = "pictures/vinlabel.png";
}
let modalClose = document.getElementById("modalClose");
let closeModal = modalClose.onclick = () => {
    modal.style.display = "none";
}
modal.onclick = () => {
    modal.style.display = "none";
}
//#endregion
//Her starter kode til bad
//#region 
let dusjStatus = false;
let medSkapStatus = false;
let medStatus = false;
let dusjLyd = new Audio("sound/dusj.wav");

//Kode til dusj - bytter bilde, spiller lydeffekt og oppdaterer funksjon for medisinskapet 
document.getElementById("dusj").onclick = () => {
    dusjLyd.play();
    document.getElementById("romBilde").src = "pictures/baddamp.png"
    document.getElementById("romBilde").useMap = "#badStartMap"
    dusjStatus = true;
    let medskap = document.getElementById("medSkap");
    medskap.onclick = () => {
        show_easy_numpad(medskapTest);
    }
};


//Kode til medisin - bytter bilde og viser dialog med info
document.getElementById("medisin").onclick = () => {
    document.getElementById("romBilde").src = "pictures/badUtenMed.png"
    document.getElementById("romBilde").useMap = "#badUtenMedMap"
    bobleTekst.dataset.text = "Paracet er jo akkurat det jeg trenger! Skulle hatt noe vann å ta den med."
    visDialog(bobleTekst);
    medStatus = true;
}

//Kode til vannfalske - bytter bilde til nytt rom og viser dialog med info 
document.getElementById("vannflaske3").onclick = () => {
    if (medStatus == true) {
        document.getElementById("romBilde").src = "pictures/soverom.png"
        document.getElementById("romBilde").useMap = "#sovMap"
        bobleTekst.dataset.text = "Nøklene mine må ligge her et sted...."
        visDialog(bobleTekst)
    }
    else {
    }
}
//#endregion
//Her starter kode til soverom
//#region
let magnetStatus = false;
let traadStatus = false;
let nokkelStatus = false;


//kode til skuff
//Kode til popupfunksjon på skuffer - bytter bilde etter skuffene med innhold er trykket på en gang. 
//Viser også dialog med info om hva som skjer 
let skuff1 = document.getElementById("skuffTopp");
skuff1.onclick = () => {
    if (!traadStatus) {
        traadStatus = true;
        modal.style.display = "block";
        modalImg.src = "pictures/skuffTraad.png"
        mySound = new Audio("/sound/point.wav");
        mySound.play();
        if (magnetStatus) {
            modal.style.display = "block";
            bobleTekst.dataset.text = "Nå har jeg en tråd og en magnet, kanskje jeg kan bruke dette til noe."
            visDialog(bobleTekst);
            return traadStatus = true;
        }
        else {
            modal.style.display = "block";
            bobleTekst.dataset.text = "Her fant jeg en tråd, kanskje jeg kan bruke den til noe."
            visDialog(bobleTekst);
            return traadStatus = true;
        }
    }
    else if (traadStatus) {
        modal.style.display = "block";
        modalImg.src = "pictures/skuffTom.png"
        bobleTekst.dataset.text = "Her lå det en tråd som jeg plukket opp."
        visDialog(bobleTekst);
    }
    else {
    }
}

let skuff2 = document.getElementById("skuffMidt");
skuff2.onclick = function () {
    mySound = new Audio("sound/error.wav");
    mySound.play();
    modal.style.display = "block";
    modalImg.src = "pictures/skuffTom.png";
    bobleTekst.dataset.text = "Denne skuffen var visst tom";
    visDialog(bobleTekst)
    modalClose.onclick = () => {
        modal.style.display = "none";
    }

}

let skuff3 = document.getElementById("skuffBunn");
skuff3.onclick = function () {
    if (!magnetStatus) {
        mySound = new Audio("sound/point.wav");
        mySound.play();
        modal.style.display = "block";
        modalImg.src = "pictures/skuffMagnet.png"
        if (traadStatus) {
            bobleTekst.dataset.text = "Nå har jeg en tråd og en magnet, kanskje jeg kan bruke dette til noe."
            visDialog(bobleTekst);
            return magnetStatus = true;
        }
        else {
            bobleTekst.dataset.text = "Her fant jeg en magnet, den er sikkert lur å ha."
            visDialog(bobleTekst);
            return magnetStatus = true;
        }
    }
    else if (magnetStatus) {
        modal.style.display = "block";
        modalImg.src = "pictures/skuffTom.png"
        bobleTekst.dataset.text = "Her lå det en magnet som jeg plukket opp."
        visDialog(bobleTekst);
    }
    modalClose.onclick = () => {
        modal.style.display = "none";
    }
}


//Kode til radiatore
//Nøklene ligger bak radiatorern, for å få tak i disse trenger spilleren tråd og magnet fra skuffene
//Denne funksjonen sjekker om spilleren har det som trengs, og kommer med ulike tilbakemeldinger basert på hva spilleren har gjort
let radiator = document.getElementById("radiator");

let radiatorTest = radiator.onclick = () => {
    let radiatorTekst = document.querySelector("#radiator");
    if ((!magnetStatus) && (!traadStatus)) {
        mySound = new Audio("sound/error.wav");
        mySound.play()
        radiatorTekst.dataset.text = "Oi! Nøklene er bak radiatoren, jeg trenger noe for å få dratt de opp."
        visDialog(radiatorTekst)
        radiator.onclick = () => { radiatorTest() };
    } else if ((magnetStatus) && (!traadStatus)) {
        mySound = new Audio("sound/error.wav");
        mySound.play()
        radiatorTekst.dataset.text = "Nøklene mine er bak radiatoren og reagerer på magneten, men magneten er ikke sterk nok til å trekke de opp. Jeg må ha noe å feste den i."
        visDialog(radiatorTekst);
        radiator.onclick = () => { radiatorTest() };
    } else if ((!magnetStatus) && (traadStatus)) {
        mySound = new Audio("sound/error.wav");
        mySound.play()
        radiatorTekst.dataset.text = "Nøklene mine er bak her, men jeg får ikke tak i dem med bare tråden."
        visDialog(radiatorTekst);
        radiator.onclick = () => { radiatorTest() };
    } else if ((magnetStatus) && (traadStatus) && (!nokkelStatus)) {
        mySound = new Audio("sound/point.wav");
        mySound.play();
        radiatorTekst.dataset.text = "Endelig fikk jeg tak i nøklene mine som lå bak her med tråden og magneten, nå kan jeg komme meg videre."
        visDialog(radiatorTekst);
        nokkelStatus = true;
        radiator.onclick = () => { radiatorTest() };
    } else if (nokkelStatus) {
        radiatorTekst.dataset.text = "Jeg har allerede funnet nøklene mine bak her, nå må jeg komme meg videre."
        visDialog(radiatorTekst);
    } 
    else {
        mySound = new Audio("sound/error.wav");
        mySound.play();
        console.log("error");
    }

}

//Kode til skap på soverom - om nøklene ikke er funnet får man info om at skapet er en dør er de funnet sender den
//spilleren videre til neste rom
let sovSkap = document.getElementById("sovSkap");
sovSkap.onclick = () => {
    if (!nokkelStatus) {
        bobleTekst.dataset.text = "Kult! Her er en dør som ser ut som et skap. Før jeg går videre må jeg finne nøklene mine."
        visDialog(bobleTekst);
    }
    else if (nokkelStatus) {
        mySound = new Audio("sound/dør.mp3");
        mySound.play()
        document.getElementById("romBilde").src = "pictures/gang.png"
        document.getElementById("romBilde").useMap = "#gangMap"
        bobleTekst.dataset.text = "Den kidden har jo stjelt telefonen min! Han bør jeg snakke med."
        visDialog(bobleTekst)
    }
    else {
        console.log("error")
    }
};


//#endregion

//HER STARTER BAD

let brevStatus = false;
let snakeStatus = false;

/* Funksjon til brev - spiller av musikk, endrer status og viser dialog */
function lesBrev() {
    let brev = document.getElementById("brev");
    if (brevStatus === false) {
        mySound = new Audio("sound/point.wav");
        mySound.play();
        brev.dataset.text = "Aha! Her står det at adressen er Kringeveien 8!";
        visDialog(brev);
        brevStatus = true;
    } else {
        mySound = new Audio("error.wav");
        mySound.play();
        brev.dataset.text = "Jeg har allerede funnet adressen, den er Kringeveien 8.";
        brevStatus = true;
        visDialog(brev);
    }
}
let guttStatus = false;
/* Viser dialog for gutten og endrer status på om dette er gjort */
let guttSnakker = document.getElementById("gutt").onclick = () => {
    guttStatus = true;
    bobleTekst.dataset.text = "Du får ikke tilbake telefonen din før du slår highscoreen min i snake";
    visDialog(bobleTekst);
}

/* Funksjonen til dør i gang, endres basert på status på brev og snake. 
Spiller får beskjed om hva som mangler om dette er tilfellet, eller fullfører spillet om alle oppgaver er utført */
function dorTanke() {
    let utgangsDor = document.querySelector("#utgangsDor");
    if (brevStatus === false && snakeStatus === false) {
        mySound = new Audio("sound/error.wav");
        mySound.play();
        utgangsDor.dataset.text = "Jeg må ringe en taxi... Jeg vet ikke adressen hit. Hadde også vært kjekt med en telefon for å ringe med.";
        visDialog(utgangsDor);
        let utgang = utgangsDor.onclick = () => {
            dorTanke();
        }
    }
    else if (brevStatus === true && snakeStatus === false) {
        mySound = new Audio("sound/error.wav");
        mySound.play();
        utgangsDor.dataset.text = "Jeg har adressen, men trenger fortsatt en telefon";
        visDialog(utgangsDor);
        let utgang = utgangsDor.onclick = () => {
            dorTanke();
        }
    }
    else if (brevStatus === false && snakeStatus === true) {
        mySound = new Audio("sound/error.wav");
        mySound.play();
        utgangsDor.dataset.text = "Jeg slo kidden i snake, så da får jeg tilbake telefonen min. Men hva er adressen hit?";
        visDialog(utgangsDor);
        let utgang = utgangsDor.onclick = () => {
            dorTanke();
        }
    }
    else {
        mySound = new Audio("sound/applaus.wav");
        mySound.play();
        alert("Gratulerer! Du har fullført spillet. Håper du hadde det")
        setTimeout(() => {
            location.reload();
        }, 3000);
    }
}

//Kode til snake popup og snake
//#region 
let snakeModal = document.getElementById("snakeModal");
let mobil = document.getElementById("mobil");
mobil.onclick = () => {
    if (guttStatus) {
        snakeModal.style.display = "block";
    }
    else {
        bobleTekst.dataset.text = "Du må slå meg i snake før du kan få tilbake telefonen din."
        guttStatus = true;
        visDialog(bobleTekst);
        snakeModal.style.display = "block";
    }
}

let snakeClose = document.getElementById("snakeClose");
let close = snakeClose.onclick = function () {
    snakeModal.style.display = "none";
}


//Snake
const board_border = 'red';
const board_background = "black";
const snake_col = 'green';
const snake_border = 'darkblue';

let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
]

let score = 0;
// Status på retningsbytte
let changing_direction = false;
let food_x;
let food_y;
// Verdier for bevegelses retning
let dx = 10;
let dy = 0;


// Henter canvaselement
const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");

document.addEventListener("keydown", change_direction);
//Genererer mat
gen_food();
let snakeKnapp = document.getElementById("snakeKnapp");
snakeKnapp.onclick = () => {
    main();
    snakeboard.style.display = "block";

}
function main() {
    //Setter startknappen for snake til "hidden"
    snakeKnapp.style.visibility = "hidden";
    if (has_game_ended()) {
        /* Starter snakespillet automatisk på nytt om spilleren treffer veggen før
        nødvendig score er oppnådd */
        mySound = new Audio("sound/error.wav");
        mySound.play();
        snake = [
            { x: 200, y: 200 },
            { x: 190, y: 200 },
            { x: 180, y: 200 },
            { x: 170, y: 200 },
            { x: 160, y: 200 }
        ];
        dx = 10;
        dy = 0;
        score = 0;
        document.getElementById('score').innerHTML = "Poeng: " + score;
    }

    changing_direction = false;
    setTimeout(function onTick() {
        clear_board();
        drawFood();
        move_snake();
        drawSnake();
        // Repeat
        main();
    }, 100)
}

// Tegner opp snakebrettet 
function clear_board() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokestyle = board_border;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(1, 1, snakeboard.width, snakeboard.height);
}

// Tegner opp slangen i canvas
function drawSnake() {
    snake.forEach(drawSnakePart)
}
//Denne tegner maten
function drawFood() {
    snakeboard_ctx.fillStyle = 'red';
    snakeboard_ctx.strokestyle = 'red';
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}
//Denne tegner hver enkelt del av slanger
function drawSnakePart(snakePart) {
    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.strokestyle = snake_border;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}


//Sjekker om spiller treffer veggen, og gjør det mulig å starte spillet på nytt på den måten det blir gjort ovenfor
function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;

}

function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

//Genererer ny matbit på tilfeldig plass i spillbrettet
function gen_food() {
    food_x = random_food(0, snakeboard.width - 10);
    food_y = random_food(0, snakeboard.height - 10);
    // Sikrer at maten ikke blir generert på lokasjonen til slangen
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
    });
}


//Endrer retning på slangen når pilstastene trykkes
function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changing_direction) return;
    changing_direction = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
        //Hindrer siden å scrolle opp og ned når piltastene trykkes
        event.preventDefault();
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
        //Hindrer siden å scrolle opp og ned når piltastene trykkes
        event.preventDefault();
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
        //Hindrer siden å scrolle opp og ned når piltastene trykkes
        event.preventDefault();
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
        //Hindrer siden å scrolle opp og ned når piltastene trykkes
        event.preventDefault();
    }
}

function move_snake(event) {
    // Lager nytt hode til slangen
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    // Setter hodet sammen med starten av slangekroppen
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
        //spiller av lyd ved poeng
        mySound = new Audio("sound/point.wav");
        mySound.play();
        // Øker poengscoren
        score += 1;
        // Viser poengscore
        document.getElementById('score').innerHTML = "Poeng: " + score;
        // Genererer ny mat
        gen_food();
    } else {
        //Sletter siste del av kroppen
        snake.pop();
    }
    //Legger til at snake lukkes automatisk når man oppnår en gitt score
    //setter snakeStatus til true og spiller av seireslyd, samt viser dialog med info
    if (score == 11) {
        mySound = new Audio("sound/applaus.wav");
        mySound.play();
        close();
        document.getElementById("highscore").innerHTML = "Highscore: " + score;
        snakeStatus = true;
        event.stopPropagation();
        if (brevStatus) {
            bobleTekst.dataset.text = "Endelig! Nå får jeg tilbake telefonen min og kan jeg bestille taxi!"
            visDialog(bobleTekst);
        }
        else {
            bobleTekst.dataset.text = "Endelig! Nå får jeg tilbake telefonen min, men jeg må finne adressen hit!"
            visDialog(bobleTekst);
        }
    }
}
//#endregion

//Kode til infobobler
//#region 

//Gjør at alle objekter med klassen klikkbar kan gies en data-text i HTML som vises i dialog når objektet blir trykket på.
let klikkbartObjekt = document.querySelectorAll(".klikkbar");
klikkbartObjekt.forEach((klikkbar) => {
    klikkbar.onclick = () => {
        visDialog(klikkbar)
    };
});
let bobleTekst = document.querySelector("#bobleTekst")
//Funksjon som viser dialog samt gjør det mulig å lukke den
function visDialog(element) {
    let bobleClose = document.getElementById("bobleClose");
    let boblevises = false;
    let boble = document.getElementById("bobleModal")


    let lukkDialog = () => {
        if (boblevises) {
            boble.style.display = "none";
            boblevises = false;

        }
    }
    bilde.onmousedown = lukkDialog;


    boble = document.getElementById("bobleModal")
    bobleTekst = document.getElementById("bobleTekst");
    boblestatus = true;
    boblevises = true;

    bobleClose.onclick = lukkDialog;
    element.onclick = () => {
        lukkDialog()
        element.onclick = () => {
            visDialog(element);
        }
    };
    boble.onclick = lukkDialog;


    if (!element.dataset.text) {
        return
    }


    bobleTekst.innerHTML = element.dataset.text;
    boble.style.display = "block";
}
//#endregion


//kode til Keypad
//#region 
let _outputID = "";
let _minValue = null;
let _maxValue = null;
let _isInRange = true;


//Lager et nytt HTML-element og legger det til som child under "body"
function show_easy_numpad(thisElement) {
    let easy_numpad = document.createElement("div");
    easy_numpad.id = "easy-numpad-frame";
    easy_numpad.className = "easy-numpad-frame";
    easy_numpad.innerHTML = `
    <div class="easy-numpad-container">
    <div class="easy-numpad-output-container">
        <p class="easy-numpad-output" id="easy-numpad-output"></p>
    </div>
    <div class="easy-numpad-number-container">
        <table>
            <tr class="trpad">
                <td class="tdpad"><a id="7" onclick="easynum(this)">7</a></td>
                <td class="tdpad"><a id="8" onclick="easynum(this)">8</a></td>
                <td class="tdpad"><a id="9" onclick="easynum(this)">9</a></td>
                <td class="tdpad tdpadStor"><a id="Del" class="del" id="del" onclick="easy_numpad_del()">Slett</a></td>
            </tr>
            <tr class="trpad">
                <td class="tdpad"><a id="4" onclick="easynum(this)">4</a></td>
                <td class="tdpad"><a id="5" onclick="easynum(this)">5</a></td>
                <td class="tdpad"><a id="6" onclick="easynum(this)">6</a></td>
                <td class="tdpad tdpadStor"><a id="Clear" class="clear" id="clear" onclick="easy_numpad_clear()">Tøm</a></td>
            </tr>
            <tr class="trpad">
                <td class="tdpad"><a id="1" onclick="easynum(this)">1</a></td>
                <td class="tdpad"><a id="2" onclick="easynum(this)">2</a></td>
                <td class="tdpad"><a id="3" onclick="easynum(this)">3</a></td>
                <td class="tdpad tdpadStor"><a id="Cancel" class="cancel" id="cancel" onclick="easy_numpad_cancel()">Avbryt</a></td>
            </tr>
            <tr class="trpad">
                <td class="tdpad"><a id="±" onclick="easynum(this)">+</a></td>
                <td class="tdpad"><a id="0" onclick="easynum(this)">0</a></td>
                <td class="tdpad"><a id="." onclick="easynum(this)">.</a></td>
                <td class="tdpad tdpadStor"><a id="Done" class="done" id="done" onclick="easy_numpad_done()">Bekreft</a></td>
            </tr>
        </table>
    </div>
</div>
`;

    document.getElementsByTagName('body')[0].appendChild(easy_numpad);
    _outputID = thisElement.id;
    _minValue = document.getElementById(thisElement.id).getAttribute("min");
    _maxValue = document.getElementById(thisElement.id).getAttribute("max");

    let useDefault = document.getElementById(thisElement.id).getAttribute("data-easynumpad-use_default");
    if (useDefault != "false") {
        document.getElementById("easy-numpad-output").innerText = thisElement.value;
    }
}

//Gjør det mulig å lukke keypad, viser ulik dialog basert på hvor keypaden åpnes
function easy_numpad_close() {
    let elementToRemove = document.querySelectorAll("div.easy-numpad-frame")[0];
    elementToRemove.parentNode.removeChild(elementToRemove);

    if (_outputID == "dorkodeTest") {
        bobleTekst = document.querySelector("#bobleTekst");
        bobleTekst.dataset.text = "Du må ha en firesifret kode for låse opp døren. Bruk objektene i rommet for å komme frem til koden."
        visDialog(bobleTekst);
    } else if (_outputID == "medskapTest") {
        let medskap = document.querySelector("#medSkap");
        bobleTekst.dataset.text = "Du må ha en tresifret kode for låse opp skapet. Bruk objektene i rommet for å finne koden.";
        visDialog(medskap);
        let lukkTest = medskap.onclick = () => {
            show_easy_numpad(medskapTest);
        }
    }

}


//legger inn funksjonen til knappene i keypadden
function easynum(thisElement) {
    event.preventDefault();
    let currentValue = document.getElementById("easy-numpad-output").innerText;
    switch (thisElement.innerText) {
        case "±":
            if (currentValue.startsWith("-")) {
                document.getElementById("easy-numpad-output").innerText = currentValue.substring(1, currentValue.length);
            }
            else {
                document.getElementById("easy-numpad-output").innerText = "-" + currentValue;
            }
            break;
        case ".":

            if (currentValue.length === 0) {
                document.getElementById("easy-numpad-output").innerText = "0.";
            }
            else if (currentValue.length === 1 && currentValue === "-") {
                document.getElementById("easy-numpad-output").innerText = currentValue + "0.";
            }
            else {
                if (currentValue.indexOf(".") < 0) {
                    document.getElementById("easy-numpad-output").innerText += ".";
                }
            }

            break;
        case "0":

            if (currentValue.length === 0) {
                document.getElementById("easy-numpad-output").innerText = "0.";
            }
            else if (currentValue.length === 1 && currentValue === "-") {
                document.getElementById("easy-numpad-output").innerText = currentValue + "0.";
            }
            else {
                document.getElementById("easy-numpad-output").innerText += thisElement.innerText;
            }

            break;
        default:

            document.getElementById("easy-numpad-output").innerText += thisElement.innerText;
            break;
    }

}

//gjør det mulig å slette tall i keypadden med knappen slett(del)
function easy_numpad_del() {
    //event.preventDefault();
    let easy_numpad_output_val = document.getElementById("easy-numpad-output").innerText;
    if (easy_numpad_output_val.slice(-2) !== "0." && easy_numpad_output_val.slice(-3) !== "-0.") {
        let easy_numpad_output_val_deleted = easy_numpad_output_val.slice(0, -1);
        document.getElementById("easy-numpad-output").innerText = easy_numpad_output_val_deleted;
    }
}

//Kode til knappen tøm(clear), denne sletter alle tall i keypadden
function easy_numpad_clear() {
    //event.preventDefault();
    document.getElementById("easy-numpad-output").innerText = "";
}

//Kode til knappen avbryt(cancel), denne lukker keypadden
function easy_numpad_cancel() {
    easy_numpad_close();
}


/* Kode til knappen bekreft(done) denne bekrefter det spilleren har tastet inn
og sjekker om dette er rett kode  */
function easy_numpad_done() {
    let easy_numpad_output_val = document.getElementById("easy-numpad-output").innerText;
    let code;

    if (_outputID == "dorkodeTest") {
        code = 9583;
    };

    if (_outputID == "medskapTest") {
        code = 835;
    };

    if (easy_numpad_output_val.indexOf(".") === (easy_numpad_output_val.length - 1)) {
        easy_numpad_output_val = easy_numpad_output_val.substring(0, easy_numpad_output_val.length - 1);
    }

    let input = document.getElementById(_outputID).value;
    console.log(_outputID);

    input = easy_numpad_output_val;

    if (input == code && _outputID == "dorkodeTest") {
        mySound = new Audio("sound/point.wav");
        mySound.play();
        let dortest = document.querySelector("#door");
        dortest.classList = "klikkbar"
        dortest.dataset.text = "Bra jobbet! Døren er nå åpen!"
        visDialog(dortest);
        dortest.onclick = () => {
            document.getElementById("romBilde").src = "pictures/badStart.png"
            document.getElementById("romBilde").useMap = "#badStartMap"
            bobleTekst.dataset.text = "Jeg må få tatt noe mot denne forferdelige hodepinen før jeg kan fortsette..."
            visDialog(bobleTekst);
        }
    }
    else if (_outputID == "dorkodeTest") {
        bobleTekst = document.querySelector("#bobleTekst");
        bobleTekst.dataset.text = "FEIL. Du trenger en firesifret kode."
        visDialog(bobleTekst);
    }
    else if (input == code && _outputID == "medskapTest") {
        mySound = new Audio("sound/point.wav");
        mySound.play();
        let medskap = document.querySelector("#medSkap");
        bobleTekst = document.querySelector("#bobleTekst");
        bobleTekst.dataset.text = "Bra jobbet! Skapet er nå åpent.";
        visDialog(bobleTekst);
        medskap.onclick = () => {
            dusjLyd.pause();
            dusjLyd.currentTime = 0;
            document.getElementById("romBilde").src = "pictures/badOpen.png"
            document.getElementById("romBilde").useMap = "#badOpenMap"
        }
    } else if (_outputID == "medskapTest") {
        bobleTekst = document.querySelector("#bobleTekst");
        bobleTekst.dataset.text = "FEIL. Du trenger en tresifret kode.";
        visDialog(bobleTekst);
    }
    else {
    }

    let elementToRemove = document.querySelectorAll("div.easy-numpad-frame")[0];
    elementToRemove.parentNode.removeChild(elementToRemove);

};
//#endregion

