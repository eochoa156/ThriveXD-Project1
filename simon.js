var simonSequence = [];
var playerSequence = [];
var buttons = document.getElementsByClassName('simonButton');

function simonTurn() {
    var color = ['red', 'blue', 'green', 'yellow'];
    var randomColor = color[Math.floor(Math.random() * color.length)];
    simonSequence.push(randomColor);
    console.log("Simon's sequence:", simonSequence);
    displaySequence();
}

function displaySequence() {
    var i = 0;
    var interval = setInterval(function() {
        lightUpButton(simonSequence[i]);
        i++;
        if (i >= simonSequence.length) {
            clearInterval(interval);
        }
    }, 1000);
}

function lightUpButton(color) {
    console.log("Lighting up button:", color);
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

// Start the game
simonTurn();


