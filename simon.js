const green = document.querySelector('.top-left-panel');
const yellow = document.querySelector('.top-right-panel');
const red = document.querySelector('.bottom-left-panel');
const blue = document.querySelector('.bottom-right-panel');

// Define the buttons array by querying the DOM for the color buttons
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
        await flash(panel); // Wait for the flash animation to complete
        await delay(1000); // Wait for 1 second before displaying the next color
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

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        var clickedColor = this.id;
        playerSequence.push(clickedColor);
        console.log("Player's sequence:", playerSequence);
        if (checkSequence()) {
            if (playerSequence.length === simonSequence.length) {
                console.log("Correct sequence! Continuing the game.");
                playerSequence = [];
                setTimeout(simonTurn, 1000);
            }
        } else {
            console.log('Game over!');
        }
    });
}

// Start simon's turn
simonTurn();
