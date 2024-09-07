let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let score = 0;
let bestScore = localStorage.getItem("bestScore2048") || 0;

document.addEventListener("DOMContentLoaded", () => {
    generateNewTile();
    generateNewTile();
    document.getElementById("best-score").innerText = bestScore;
});

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
    }
});

document.getElementById("newgame").addEventListener("click", () => {
    board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    score = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("best-score").innerText = bestScore;
    for (let i = 0; i < 16; i++) {
        let tile = document.getElementById(tile-$,{i});
        tile.innerText = "";
        tile.style.backgroundColor = "";
    }
    generateNewTile();
    generateNewTile();
    let gameOverMessage = document.getElementById("game-over-message");
    gameOverMessage.classList.remove("show");
});

function generateNewTile() {
    let emptyTiles = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                emptyTiles.push([i, j]);
            }
        }
    }
    if (emptyTiles.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyTiles.length);
        let [x, y] = emptyTiles[randomIndex];
        board[x][y] = Math.random() < 0.5 ? 2 : 4;
        updateTile(x, y);
    }
}

function updateTile(x, y) {
    let tile = document.getElementById(`tile-${x * 4 + y}`);
    if (board[x][y] === 0) {
        tile.innerText = "";
        tile.style.backgroundColor = "";
    } else {
        tile.innerText = board[x][y];
        tile.style.backgroundColor = getBackgroundColor(board[x][y]);
    }
}

function getBackgroundColor(value) {
    switch (value) {
        case 2:
            return "yellow";
        case 4:
            return "pink";
        case 8:
            return "orange";
        case 16:
            return "lightgreen";
        case 32:
            return "dodgerblue";
        case 64:
            return "slateblue";
        case 128:
            return "violet";
        case 256:
            return "royalblue";
        case 512:
            return "chocolate";
        case 1024:
            return "crimson";
        case 2048:
            return "gold";
        default:
            return "#fff";
        }
    }
    
    function moveUp() {
        for (let j = 0; j < 4; j++) {
            let column = [board[0][j], board[1][j], board[2][j], board[3][j]];
            let newColumn = mergeColumn(column);
            for (let i = 0; i < 4; i++) {
                board[i][j] = newColumn[i];
                updateTile(i, j);
            }
        }
        generateNewTile();
            if (isGameOver()) {
                displayGameOver();
            }
    }
    
    function moveDown() {
        for (let j = 0; j < 4; j++) {
            let column = [board[3][j], board[2][j], board[1][j], board[0][j]];
            let newColumn = mergeColumn(column);
            for (let i = 0; i < 4; i++) {
                board[3 - i][j] = newColumn[i];
                updateTile(3 - i, j);
            }
        }
        generateNewTile();
            if (isGameOver()) {
                displayGameOver();
            }
    }
    
    function moveLeft() {
        for (let i = 0; i < 4; i++) {
            let row = [board[i][0], board[i][1], board[i][2], board[i][3]];
            let newRow = mergeRow(row);
            for (let j = 0; j < 4; j++) {
                board[i][j] = newRow[j];
                updateTile(i, j);
            }
        }
        generateNewTile();
            if (isGameOver()) {
                displayGameOver();
            }
    }
    
    function moveRight() {
        for (let i = 0; i < 4; i++) {
            let row = [board[i][3], board[i][2], board[i][1], board[i][0]];
            let newRow = mergeRow(row);
            for (let j = 0; j < 4; j++) {
                board[i][3 - j] = newRow[j];
                updateTile(i, 3 - j);
            }
        }
        generateNewTile();
            if (isGameOver()) {
                displayGameOver();
            }
    }
    
    function mergeColumn(column) {
        let newColumn = [0, 0, 0, 0];
        let index = 0;
        for (let i = 0; i < 4; i++) {
            if (column[i] !== 0) {
                newColumn[index] = column[i];
                index++;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (newColumn[i] === newColumn[i + 1]) {
                newColumn[i] *= 2;
                newColumn[i + 1] = 0;
                increaseScore(newColumn[i]);
            }
        }
        return newColumn;
    }
    
    function mergeRow(row) {
        let newRow = [0, 0, 0, 0];
        let index = 0;
        for (let i = 0; i < 4; i++) {
            if (row[i] !== 0) {
                newRow[index] = row[i];
                index++;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                newRow[i + 1] = 0;
                increaseScore(newRow[i]);
            }
        }
        return newRow;
    }

    function isGameOver() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    return false;
                }
                if (i < 3 && board[i][j] === board[i + 1][j]) {
                    return false;
                }
                if (j < 3 && board[i][j] === board[i][j + 1]) {
                    return false;
                }
            }
        }
        return true;
    }

    function displayGameOver() {
        let gameOverMessage = document.getElementById("game-over-message");
        gameOverMessage.classList.add("show");
    }


    function increaseScore(value) {
    score += value;
    document.getElementById("score").innerText = score;
    if (score > bestScore) {
        bestScore = score;
        document.getElementById("best-score").innerText = bestScore;
        localStorage.setItem("bestScore2048", bestScore);
    }
}

