const buttons = [
    document.getElementById('red'),
    document.getElementById('blue'),
    document.getElementById('green'),
    document.getElementById('yellow')
];

var simonSequence = [];
var playerSequence = [];

function simonTurn() {
    var color = ['red', 'blue', 'green', 'yellow'];
    var randomColor = color[Math.floor(Math.random() * color.length)];
    simonSequence.push(randomColor);
    console.log("Simon's sequence:", simonSequence);
    displaySequence();
}

async function displaySequence() {
    for (let color of simonSequence) {
        let panel;
        switch (color) {
            case 'red':
                panel = red;
                break;
            case 'blue':
                panel = blue;
                break;
            case 'green':
                panel = green;
                break;
            case 'yellow':
                panel = yellow;
                break;
        }
        await flash(panel);
        await delay(1000);
    }
}

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

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
}

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        var clickedColor = this.id;
        playerSequence.push(clickedColor);
        console.log("Player's sequence:", playerSequence);
        if (checkSequence()) {
            if (playerSequence.length === simonSequence.length) {
                console.log("Correct sequence! Continuing the game.");
                playerSequence = [];
                score++;
                updateScoreDisplay();
                setTimeout(simonTurn, 1000);
            }
        } else {
            console.log('Game over!');
            alert('Game Over!')
        }
    });
}

simonTurn();