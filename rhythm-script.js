// Notes for the first confrontation of the earthworm, as a tutorial
const notesTutorial = [
    {lane: 1, delay: 0},
    {lane: 2, delay: 1500},
    {lane: 3, delay: 3000},
    {lane: 4, delay: 4000},
    {lane: 3, delay: 4600},
    {lane: 1, delay: 6000},
    {lane: 4, delay: 7800},
    {lane: 1, delay: 8500},
    {lane: 3, delay: 9500},
    {lane: 4, delay: 10200},
    {lane: 1, delay: 11000},
    {lane: 2, delay: 11000},
    {lane: 3, delay: 11000},
    {lane: 4, delay: 11000},
    {lane: "done", delay: 14500}
];
// Notes for the main part of the earthworm
const notesMain = [
    { lane: 1, delay: 0 },
    { lane: 2, delay: 500 },
    { lane: 3, delay: 1000 },
    { lane: 4, delay: 1500 },
    { lane: 1, delay: 2000 },
    { lane: 3, delay: 2300 },
    { lane: 2, delay: 2600 },
    { lane: 4, delay: 2900 },
    { lane: 1, delay: 3400 },
    { lane: 1, delay: 3600 },
    { lane: 2, delay: 3900 },
    { lane: 2, delay: 4100 },
    { lane: 1, delay: 4500 },
    { lane: 2, delay: 4700 },
    { lane: 3, delay: 4900 },
    { lane: 4, delay: 5100 },
    { lane: 3, delay: 5300 },
    { lane: 2, delay: 5500 },
    { lane: 1, delay: 5700 },
    { lane: 2, delay: 6300 },
    { lane: 3, delay: 6500 },
    { lane: 4, delay: 6700 },
    { lane: 1, delay: 7200 },
    { lane: 2, delay: 7400 },
    { lane: 3, delay: 7600 },
    { lane: 4, delay: 7800 },
    { lane: 1, delay: 8400 },
    { lane: 1, delay: 8600 },
    { lane: 2, delay: 8800 },
    { lane: 2, delay: 9000 },
    { lane: 3, delay: 9200 },
    { lane: 4, delay: 9400 },
    { lane: 1, delay: 10000 },
    { lane: 2, delay: 10000 },
    { lane: 3, delay: 10000 },
    { lane: 4, delay: 10000 },
    { lane: 1, delay: 10700 },
    { lane: 3, delay: 11000 },
    { lane: 2, delay: 11300 },
    { lane: 4, delay: 11600 },
    { lane: 1, delay: 11900 },
    { lane: 2, delay: 12200 },
    { lane: 3, delay: 12500 },
    { lane: 4, delay: 12800 },
    { lane: 1, delay: 13500 },
    { lane: 2, delay: 13700 },
    { lane: 3, delay: 13900 },
    { lane: 4, delay: 14100 },
    { lane: 1, delay: 14300 },
    { lane: 2, delay: 14500 },
    { lane: 3, delay: 14700 },
    { lane: 4, delay: 14900 },
    { lane: 1, delay: 15500 },
    { lane: 3, delay: 15700 },
    { lane: 2, delay: 15900 },
    { lane: 4, delay: 16100 },
    { lane: 1, delay: 16300 },
    { lane: 3, delay: 16500 },
    { lane: 2, delay: 16700 },
    { lane: 4, delay: 16900 },
    { lane: 1, delay: 17200 },
    { lane: 1, delay: 17400 },
    { lane: 2, delay: 17500 },
    { lane: 2, delay: 17700 },
    { lane: 3, delay: 17800 },
    { lane: 3, delay: 18000 },
    { lane: 4, delay: 18200 },
    { lane: 4, delay: 18300 },
    { lane: 1, delay: 18500 },
    { lane: 2, delay: 18600 },
    { lane: 3, delay: 18700 },
    { lane: 4, delay: 18800 },
    { lane: 1, delay: 19000 },
    { lane: 2, delay: 19200 },
    { lane: 3, delay: 19400 },
    { lane: 4, delay: 19600 },
    { lane: 1, delay: 20000 },
    { lane: 2, delay: 20000 },
    { lane: 3, delay: 20000 },
    { lane: 4, delay: 20000 },
    { lane: 1, delay: 20500 },
    { lane: 2, delay: 20700 },
    { lane: 3, delay: 20900 },
    { lane: 4, delay: 21100 },
    { lane: 1, delay: 21300 },
    { lane: 2, delay: 21500 },
    { lane: 3, delay: 21700 },
    { lane: 4, delay: 21900 },
    { lane: 1, delay: 22500 },
    { lane: 2, delay: 22500 },
    { lane: 3, delay: 22500 },
    { lane: 4, delay: 22500 },
    { lane: 4, delay: 23000 },
    { lane: 3, delay: 23150 },
    { lane: 2, delay: 23300 },
    { lane: 1, delay: 23450 },
    { lane: "done", delay: 28000 }
];


const lanes = [];
const lanekeys = [["d", "ArrowLeft"], ["f", "ArrowDown"], ["j", "ArrowUp"], ["k", "ArrowRight"]];
const pressed = [];
const laneColours = ["rgb(100, 0, 0)", "rgb(0, 0, 100)", "rgb(100, 100, 0)", "rgb(0, 100, 0)"];
let missedNotes = 0;
let perfectNotes = 0;
let score = 100;

for (let i = 0; i < 4; i++) {
    lanes.push(document.getElementById(`lane${i + 1}`));
}

let gameTime = 0;
let spawned = [];
const scoreTxt = document.getElementById("score-text");
const perfectTxt = document.getElementById("perfect-text");
const missedTxt = document.getElementById("missed-text");

function updateScore() {
    score = 100 - (missedNotes * 50) + (perfectNotes * 25);
    scoreTxt.textContent = `Score: ${score}`;
    perfectTxt.textContent = `Perfect: ${perfectNotes}`;
    missedTxt.textContent = `Missed: ${missedNotes}`;
    if (score < 0) {
        window.location.href = "game-over.html";
    }
}

let gameTimeInterval = null;

function updateGameTime() {
    gameTime += 100;
}

function startGameTime() {
    if (gameTimeInterval) clearInterval(gameTimeInterval);
    gameTime = 0;
    gameTimeInterval = setInterval(updateGameTime, 100);
}

function stopGameTime() {
    if (gameTimeInterval) clearInterval(gameTimeInterval);
    gameTimeInterval = null;
}


function initTutorial() {
    infoEl = document.getElementById("rhythm-info-wrapper");
    infoEl.style.display = "none";
    gameEl = document.getElementById("def-hidden");
    gameEl.style.display = "block";
    startGameTime()
    spawnNotesLoop(notesTutorial, "proceed");
}

function initMain() {
    infoEl = document.getElementById("rhythm-info-wrapper");
    infoEl.style.display = "none";
    score = 0;
    perfectNotes = 0;
    missedNotes = 0;
    updateScore();
    startGameTime();
    spawned = [];
    scoreTxt.style.display = "block";
    perfectTxt.style.display = "block";
    missedTxt.style.display = "block";
    gameEl = document.getElementById("def-hidden");
    gameEl.style.display = "block";
    spawnNotesLoop(notesMain, "redirect");
}


function spawnNotesLoop(noteSet, functionType) {
    noteSet.forEach((note, index) => {
        if (!spawned.includes(index) && gameTime >= note.delay) {
            spawned.push(index); 

            if (note.lane === "done") {
                gameEl.style.display = "none";
                if (functionType === "redirect") {
                    window.location.href = "cutscene-segment.html?textset=4";
                } else {
                    const bg = document.getElementById("rhythm-bg");
                    const playButton = document.getElementById("rhythm-play-button");
                    playButton.textContent = "Continue";
                    playButton.onclick = () => initMain();
                    infoEl.style.display = "flex";
                    bg.style.backgroundColor = "black";
                    scoreTxt.style.display = "none";
                    perfectTxt.style.display = "none";
                    missedTxt.style.display = "none";
                }
            } else {
                spawnNote(note, index, noteSet);
            }
        }
    });

    requestAnimationFrame(() => spawnNotesLoop(noteSet, functionType));
}



function isLaneColliding(laneIndex) {
    const timingField = document.getElementById(`tf${laneIndex + 1}`);
    const notes = lanes[laneIndex].getElementsByClassName("note");

    for (let note of notes) { 
        const noteRect = note.getBoundingClientRect();
        const tfRect = timingField.getBoundingClientRect();

        const isColliding = !(
            noteRect.bottom < tfRect.top ||
            noteRect.top > tfRect.bottom ||
            noteRect.right < tfRect.left ||
            noteRect.left > tfRect.right
        );

        if (isColliding) return true;
    }

    return false;
}

function spawnNote(note, index, noteSet) {
    const el = document.createElement("div");
    el.classList.add("note");
    const laneIndex = note.lane - 1;
    el.classList.add(`note${laneIndex + 1}`);
    lanes[laneIndex].appendChild(el);
    animateNote(el, index, laneIndex);
}

function animateNote(el, noteIndex, laneIndex) {
    let y = 0; // % of viewport height
    const timingField = document.getElementById(`tf${laneIndex + 1}`);

    function animate() {
        y += 0.8;

        // Convert vh to px for actual transform
        const yPx = y * window.innerHeight / 100;
        el.style.transform = `translateY(${yPx}px)`;

        const noteRect = el.getBoundingClientRect();
        const tfRect = timingField.getBoundingClientRect();

        const isColliding = !(
            noteRect.bottom < tfRect.top ||
            noteRect.top > tfRect.bottom ||
            noteRect.right < tfRect.left ||
            noteRect.left > tfRect.right
        );

        if (isColliding) {
            el.style.backgroundColor = "gray";

            if (pressed.includes(laneIndex)) {
                // Perfect hit!
                const bg = document.getElementById("rhythm-bg");
                bg.style.backgroundColor = laneColours[laneIndex];
                el.remove();
                perfectNotes++;
                updateScore();

                // Remove this press to avoid multi-triggers
                const pressIdx = pressed.indexOf(laneIndex);
                if (pressIdx > -1) {
                    pressed.splice(pressIdx, 1);
                }

                return; // stop animating this note
            }
        } else {
            el.style.backgroundColor = ""; // back to normal
        }

        if (yPx < window.innerHeight + el.offsetHeight) {
            requestAnimationFrame(animate);
        } else {
            // Missed because fell past
            missedNotes++;
            updateScore();
            el.remove();
        }
    }

    animate();
}

document.addEventListener("keydown", function(event) {
    for (let i = 0; i < 4; i++) {
        if (lanekeys[i].includes(event.key) && !pressed.includes(i)) {
            pressed.push(i);

            if (!isLaneColliding(i)) {
                // Player pressed with NO note in timing window = miss
                missedNotes++;
                updateScore();
            }
        }
    }
});

document.addEventListener("keyup", function(event) {
    for (let i = 0; i < 4; i++) {
        if (lanekeys[i].includes(event.key)) {
            const index = pressed.indexOf(i);
            if (index > -1) {
                pressed.splice(index, 1);
            }
        }
    }
});
