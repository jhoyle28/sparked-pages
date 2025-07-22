// Below is all the text used in the "cutscene" sections of the game, with functions within
const text = [
// Starting cutscene
["The darkness constricted your soul, dragging you to the center of the earth.", 
"The walls were non-existant, darkness drained the life from your eyes, until you were nothing but a blank slate.",
"All of a sudden, an icy-cold hand took hold of your heart...",
"white",
"The light was overwhelming...",
"Blinding anyone who would dare to squint their eyes.",
"The end of the line was nearing.",
"But what would happen next...?",
"blackraw",
"wait1",
"changepage"],
// Infected dungeons entrance
["The walls turned greenish-yellow, giving off a distasteful aura..",
"green-yellow",
"The root of all problems was at hand.",
"Lively soldiers converted into evil mindless monsters.",
"Capable of anything.",
"This was obviously the reason it was evacuated...",
"Yet, you knew something was approaching.",
"That being souless, having no mercy in it's heart..",
"The spark of life being absorbed and dragged into the depths below.",
"Everything was similar, but different.",
"whiteraw",
"wait1",
"changepage"],
// Shallow tunnels entrance
["The walls became faint, disallowing the sharpest of eyes to make sense of the surroundings.",
"A deep tremble shook the earth...",
"brown",
"The well-kept chamber converted into a never-seen-before environment.",
"You could hear something, from a distance.",
"It was close, but not so far.",
"A stench from the above layers filled the air.",
"You knew that you shouldn't be here.",
"You are unwelcome.",
"whiteraw",
"wait1",
"changepage"],
// Earthworm den entrance
["You tried to escape...",
"The beast was as large as a school bus, and as fast as a falcon.",
"You found a gap in the wall, you entered, losing the earthworm in the process.",
"You need to stay as quiet as possible.",
"Even your heartbeat echoed throughout the tunnels...",
"Stay Quiet.",
"whiteraw",
"wait1",
"changepage"],
// The Choice
["You felt hopeless...",
"Although it was gone then, it was sure to come back sooner...",
"You smelt something from a nearby passageway.",
"The darkness expanded, consuming the light that was never there.",
"Suddenly, your existance was swept away from the plane of reality..",
"A dark and seemingly sinister voice came to you.",
"He gave you a deal.",
"If you proceed, there is a 50% chance that the world would return to the horrible state it was met with before",
"However, there is a 50% chance that all bugs will be cured from the infection.",
"Which will bring the spark back to reality.",
"Your heart was thudding.",
"You knew this could be a trap.",
"You knew whoever was in front of you",
"Is the cause of the infection.",
"However, something glimmered within you.",
"A spark of hope.",
"Returning to the soil wouldn't be such a bad thing anyway",
"You went on with the deal.",
'"I knew you would do it", whispered the unknown entity.',
'"You are hopeless, with nowhere else to hide"',
'"I knew you are not like the others."',
'"Very well then..."',
'"Let\'s see where fate lands."',
"decide",
"whiteraw",
"wait1",
"changepage"],
// Good Ending?
["green",
"The stench that once filled these caverns was lifted.",
"The sound of the earthworm that slided through the tunnels, was gone.",
"Everything felt nostalgic.",
"Utter joy filled your heart.",
"You were lucky.",
"One of the few to make it out alive.",
"Suddenly the walls disappeared.",
"You snapped back to reality.",
"You were never a nameless fern.",
"Never nobody.",
"Always someone.",
"black",
"Then you saw it.",
"Thousands of other bugs brainwashed, in a simulation.",
"Trying to escape the earthworm.",
"Trying to be happy, for no reason.",
"You were the only one to escape.",
"There was no reason to keep going.",
"If there was nobody else.",
"There was never a good ending.",
"So you decided to go back.",
"Back to the very beginning.",
"And re-enter the neverending loop.",
"Of SPARKED.",
"whiteraw",
"wait1",
"changepage"],
// Bad Ending
["red",
"Every muscle in your body weakened.",
"You fell to the ground at a staggering pace.",
"Your mind was shattered.",
"black",
"wait1",
"changepage"]
];
const presetFunctions = ["white", "black", "changepage", "wait1", "blackraw", "whiteraw", "green-yellow", "brown", "decide", "green", "red"] // Small functions inside the text to make it more simple
const nextPage = {
    0: "awake-chamber.html",
    1: "infected-dungeon.html",
    2: "shallow-tunnels.html",
    3: "rhythm-game.html",
    4: null,
    5: "index.html",
    6: "cutscene-segment.html?textset=0"
}
let currentText = "";
let indexNum = 0;
const isGoodEnding = Math.random() < 0.5;
let skippedTextFlag = false;
let textIndex = 0;
const dialogueSfx = document.getElementById("dialogue-sfx");

// Finds the textset based on the query string (?parameter=int in the link)
const params = new URLSearchParams(window.location.search);
let textSetNum = Number(params.get('textset')) || 0;
textLoop();
function textLoop() {
    if (indexNum < text[textSetNum][textIndex].length &&
        skippedTextFlag == false &&
        !presetFunctions.includes(text[textSetNum][textIndex])) {
        currentText = `${currentText}${text[textSetNum][textIndex][indexNum]}`; // Appends the next letter to the dialogue
        indexNum++; // Increments the number of dialogue to be appended for next iteration
        document.getElementById("text").textContent = currentText; // Applies the letter change
        setTimeout(textLoop, 30); // Loops back through the textLoop
    } else if (skippedTextFlag == true && !presetFunctions.includes(text[textSetNum][textIndex])) {
        currentText = text[textSetNum][textIndex]; // Immediately skips through dialogue
        document.getElementById("text").textContent = currentText; // Applies changes
    } else if (presetFunctions.includes(text[textSetNum][textIndex])) {
        doTextFunctions(text[textSetNum][textIndex]); // Calls the in-text functions
    }
}

function doTextFunctions(str) {
    if (str === "white") { // Fade to white effect, also fades the text to black
        document.body.style.backgroundColor = "white";
        document.querySelectorAll(".dynamic-color").forEach(el => {
            el.style.color = "black";
        });
        textLoopInit();
    } else if (str === "black") { // Fade to black effect, also fades the text to white
        document.body.style.backgroundColor = "black";
        document.querySelectorAll(".dynamic-color").forEach(el => {
            el.style.color = "white";
        });
        textLoopInit();
    } else if (str == "changepage") { // Changes the current webpage to the next in order
       const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf("/") + 1); // Finds the name of the page by getting every character after the LAST "/" in the link
        window.location.href = nextPage[textSetNum]; // Sets the next page based on object nextPage
    } else if (str == "wait1") { // Waits 1 secod before going to the next text event
        setTimeout(textLoopInit, 1000);
    } else if (str == "blackraw") { // Fades to black, without fading text to white
        document.body.style.backgroundColor = "black";
        textLoopInit();
    } else if (str == "whiteraw") { // Fades to white, without fading text to black
        document.body.style.backgroundColor = "white";
        textLoopInit();
    } else if (str == "green-yellow") {
        document.body.style.backgroundColor = "rgba(103, 108, 78, 1)";
        document.querySelectorAll(".dynamic-color").forEach(el => {
            el.style.color = "white";
        });
        textLoopInit();
    } else if (str == "brown") {
        document.body.style.backgroundColor = "rgba(104, 71, 38, 1)"
        document.querySelectorAll(".dynamic-color").forEach(el => {
            el.style.color = "white";
        });
        textLoopInit();
    } else if (str == "decide") {
        if (isGoodEnding) {
            nextPage[4] = "cutscene-segment.html?textset=5";
        } else {
            nextPage[4] = "cutscene-segment.html?textset=6";
        }
        textLoopInit();
    } else if (str == "green") {
        document.body.style.backgroundColor = "rgba(37, 65, 37, 1)"
        document.querySelectorAll(".dynamic-color").forEach(el => {
            el.style.color = "white";
        });
        textLoopInit();
    } else if (str == "red") {
        document.body.style.backgroundColor = "rgba(65, 37, 37, 1)"
        document.querySelectorAll(".dynamic-color").forEach(el => {
            el.style.color = "white";
        });
        textLoopInit();
    }
}

function textLoopInit() { // Resets all variables changed in order to proceed through text
    textIndex += 1;
    indexNum = 0;
    currentText = "";
    skippedTextFlag = false;
    textLoop();
}

document.addEventListener("keydown", function(event) {
    console.log(`Pressed: ${event.key}`);
    if (event.key == " ") {
        skippedTextFlag = true; // Skips through the dialogue
    }
    if (event.key == "Enter" && text[textSetNum][textIndex] == currentText) {
        textLoopInit();  // Proceeds through dialogue
    }
});

/* The code below adds the functionality to .fade-5-second, by getting each element 
in that class, then setting the opacity to 0. It fades because of "transition: opacity 1s ease;"
(which adds the ease effect on transition of opacity) within the CSS, also applied to .fade-5-second */
setTimeout(() => {
  const elements = document.querySelectorAll('.fade-5-second');
  elements.forEach(el => {
    el.style.opacity = '0';
  });
}, 5000);