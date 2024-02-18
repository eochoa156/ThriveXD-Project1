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
    var button = document.querySelector('.' + color);
    button.classList.add('active');
    setTimeout(function() {
        button.classList.remove('active');
    }, 1000);
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

var buttonArray = document.querySelectorAll('.simonButton');
    buttonArray.forEach(function(button) {
    button.addEventListener('click', function() {
        button.classList.add('active');
    });
});

var currentIndex = 0; 

function handleButtonClick(event) {
    event.target.classList.add('active');
    setTimeout(function() {
        event.target.classList.remove('active');
    }, 1000);
};

simonTurn();
__________________________________________
const green = document.querySelector('.top-left-panel');
const yellow = document.querySelector('.top-right-panel');
const red = document.querySelector('.bottom-left-panel');
const blue = document.querySelector('.bottom-right-panel');
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

simonTurn();

const green = document.querySelector('.top-left-panel');
const yellow = document.querySelector('.top-right-panel');
const red = document.querySelector('.bottom-left-panel');
const blue = document.querySelector('.bottom-right-panel');
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

simonTurn();