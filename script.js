let wrapper = document.querySelector("#wrapper")
const playingBoard = document.querySelector("#playingBoard");
let announceDiv = document.createElement('div');
let player1TookTurn = false;

announceDiv.classList.add('announceDiv');
announceDiv.textContent = "It's Player X's turn "
wrapper.insertBefore(announceDiv, wrapper.firstChild);

const gameBoard = (() => {      // creating the game board
    let createGrid = (size) => {
        playingBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        playingBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
       for(let i = 0;i < size*size;i++){
            const square = document.createElement('div');
            square.classList.add('cell');
            playingBoard.appendChild(square);
        }; 
    };
    createGrid(3);
})();


const playerDecision = (() => {         // displaying each player's decision
    playingBoard.addEventListener('click', function (e) {
        if (e.target.matches('.cell') && player1TookTurn == false) {
            announceDiv.textContent = "It's Player O's turn "
            e.target.style.pointerEvents = 'none';
            e.target.classList.add('Xchoice')
            e.target.classList.add('chosen');
            player1TookTurn = true;
        } else if (e.target.matches('.cell') && player1TookTurn == true) {
            announceDiv.textContent = "It's Player X's turn "
            e.target.style.pointerEvents = 'none';
            e.target.classList.add('Ochoice')
            e.target.classList.add('chosen');
            player1TookTurn = false;
        };
        gameOver.checkIfPlayerWon("Player X", "Xchoice");
        gameOver.checkIfPlayerWon("Player O", "Ochoice");
    });
})();

let cells = document.querySelectorAll('.cell')
let cellsArr = Array.from(cells); // Transforming the resulting NodeList from above to an array (Array.prototype.slice.call() for support for older browsers)
let newArr = [];

const gameOver = (() => {       // to check if the game has been won or it is a draw
    let firstRow = newArr.concat(cellsArr[0], cellsArr[1], cellsArr[2]);
    let secondRow = newArr.concat(cellsArr[3], cellsArr[4], cellsArr[5]);
    let thirdRow = newArr.concat(cellsArr[6], cellsArr[7], cellsArr[8]);
    let firstColumn = newArr.concat(cellsArr[0], cellsArr[3], cellsArr[6]);
    let secondColumn = newArr.concat(cellsArr[1], cellsArr[4], cellsArr[7]);
    let thirdColumn = newArr.concat(cellsArr[2], cellsArr[5], cellsArr[8]);
    let firstDiagonal = newArr.concat(cellsArr[0], cellsArr[4], cellsArr[8]);
    let secondDiagonal = newArr.concat(cellsArr[2], cellsArr[4], cellsArr[6]);

    const checkIfPlayerWon = (player, playerChoice) => {
        let checkForClass = (arr) => arr.every(function (e) {
            return e.classList.contains(playerChoice)
        });

        let checkForDraw = (cls) => cellsArr.every(function (e) {
            return e.classList.contains(cls)
        });
        
        if (checkForClass(firstRow) == true || checkForClass(secondRow) == true || checkForClass(thirdRow) == true || checkForClass(firstColumn) == true || checkForClass(secondColumn) == true || checkForClass(thirdColumn) == true || checkForClass(firstDiagonal) == true || checkForClass(secondDiagonal) == true) {
            announceDiv.textContent = `${player}` + " won !";
            
            cellsArr.forEach((cell) => {
				cell.style.pointerEvents = 'none'
			})
        } else if (checkForDraw('chosen')) {
            if (!(announceDiv.textContent == "Player X won !" || announceDiv.textContent == "Player O won !")) {
                announceDiv.textContent = "It's a draw !";
                
                cellsArr.forEach((cell) => {
					cell.style.pointerEvents = 'none'
			    })
            };
        };
    };
    return {
        checkIfPlayerWon,
    };
})();


const reset = (() => {      // reseting the game board
    const resetButton = document.querySelector("#reset")
    resetButton.addEventListener('click', () => {
        announceDiv.textContent = "It's Player X's turn ";

        cellsArr.forEach((cell) => {
            cell.classList.remove('Xchoice', 'Ochoice', 'chosen');
            cell.style.pointerEvents = 'auto'
        });
        
        player1TookTurn = false;

    });
})();

const git_btn = document.getElementById('git_btn')

git_btn.addEventListener('click', () => {
	window.open('https://github.com/Jonthejon10')
})
