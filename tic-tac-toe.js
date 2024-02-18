var ogBoard;
const huPlayer = 'X';
const computerPlayer = 'O';
//all possible win combos
const winCombos = [
    [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
];
//stores reference in each cell
const cells = document.querySelectorAll('.cell');
startGame();

//what happens when game starts or player presses reset button
function startGame() {
    document.querySelector(".endgame").style.display = "none";
    ogBoard = Array.from(Array(9).keys());
    //removes the x and o
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

//logs id of whatever cell is clicked
function turnClick(square) {
	if (typeof ogBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkWin(ogBoard, huPlayer) && !checkTie()) turn(bestSpot(), computerPlayer);
	}
}
//can be called with either human player or the computer
function turn(squareId, player) {
	ogBoard[squareId] = player;
    //sets inner text to hit the corresponding x or o
	document.getElementById(squareId).innerText = player;
    //checks after each turn if game is won and if done calls gameOver function
	let gameWon = checkWin(ogBoard, player)
	if (gameWon) gameOver(gameWon)
}
//checks to see who has won
function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    //check against all possible win combos
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = 
        //if human player wins then it is blue if computer has won it is pink
        gameWon.player == huPlayer ? "lightblue" : "pink";
    }
    //cant click for a following turn
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == huPlayer ? "You Win!" : "You Lose");
}

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
    return ogBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
    return minimax(ogBoard, computerPlayer).index;
}

function checkTie() {
    if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "yellow";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!")
        return true;
    }
    return false;
}
//minimax algoritim helps computer choose a spot to play
function minimax(newBoard, player) {
    var availSpots = emptySquares();
    //human wins
    if (checkWin(newBoard, huPlayer)){
        return {score: -10};
        //computer wins
    } else if (checkWin(newBoard, computerPlayer)) {
        return {score: 10};
        //tie game
    } else if (availSpots.length === 0) {
        return {score: 0};
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

    if (player == computerPlayer) {
        var result = minimax(newBoard, huPlayer);
        move.score = result.score;
    } else {
        var result = minimax(newBoard, computerPlayer);
        move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
}
//dertermines best place for the computer to take a spot
    var bestMove;
    if(player === computerPlayer) {
        var bestScore = -10000;
        for(var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
    }

    return moves[bestMove];
}