const buttons = [
    document.getElementById('red'),
    document.getElementById('blue'),
    document.getElementById('green'),
    document.getElementById('yellow')
];

var simonSequence = [];
var playerSequence = [];
//gives the possible choices to simon
function simonTurn() {
    var color = ['red', 'blue', 'green', 'yellow'];
    //randomizes the choice
    var randomColor = color[Math.floor(Math.random() * color.length)];
    //pushes it to the array so it grows by one each of simon's turn
    simonSequence.push(randomColor);
    console.log("Simon's sequence:", simonSequence);
    displaySequence();
}

//allows the simon sqeuence to be shown to player using active panel and playing the boop
async function displaySequence() {
    for (let color of simonSequence) {
        let panel;
        switch (color) {
            case 'red':
                panel = red;
                redBoop.play();
                break;
            case 'blue':
                panel = blue;
                blueBoop.play();
                break;
            case 'green':
                panel = green;
                greenBoop.play();
                break;
            case 'yellow':
                panel = yellow;
                yellowBoop.play();
                break;
        }
        await flash(panel);
        await delay(1000);
    }
}
//delays so it doesnesnt happen all at once
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const flash = (panel) => {
    return new Promise((resolve, reject) => {
        panel.classList.add('active');
        setTimeout(() => {
            panel.classList.remove('active');
            resolve();
        }, 1000);
    });
}
//checks if playerSequence matches simonSequence
function checkSequence() {
    for (var i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== simonSequence[i]) {
            return false;
        }
    }
    return true;
}

const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('scoreDisplay');
const panels = document.querySelectorAll('.panel');
let score = 0;

startButton.addEventListener('click', function() {
    panels.forEach(panel => {
        panel.style.display = 'block';
    });

    simonSequence = [];
    playerSequence = [];
    score = 0;
    updateScoreDisplay();
    simonTurn();
});
//updates the score to the length of the player sequence
function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
}

const colorSounds = {
    red: redBoop,
    blue: blueBoop,
    green: greenBoop,
    yellow: yellowBoop
};
//each click from a player is stored and plays the sound
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        var clickedColor = this.id;
        playerSequence.push(clickedColor);
        console.log("Player's sequence:", playerSequence);

        // Play corresponding sound
        switch (clickedColor) {
            case 'red':
                redBoop.play();
                break;
            case 'blue':
                blueBoop.play();
                break;
            case 'green':
                greenBoop.play();
                break;
            case 'yellow':
                yellowBoop.play();
                break;
            default:
                console.log('Invalid color!');
        }
        //checks to see if player and simon squence are the same and allows game to continue
        if (checkSequence()) {
            if (playerSequence.length === simonSequence.length) {
                console.log("Correct sequence! Continuing the game.");
                playerSequence = [];
                score++;
                updateScoreDisplay();
                setTimeout(simonTurn, 1000);
            }
            //if not player gets an alert and game is stopped
        } else {
            console.log('Game over!');
            alert('Game Over!')
        }
    });
}


var greenBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var redBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var yellowBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var blueBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

simonTurn();