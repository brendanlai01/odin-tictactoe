const gameboard = (function() {
    let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const getBoard = () => {
        return board;
    }
    const indexBoard = (index) => {
        return board[index];
    }
    const add = (mark, position) => {
        mark.toUpperCase();
        board[position] = mark;
    };

    const checkFull = () =>{
        let counter = 0;
        
        for(let i = 0; i < board.length; i++){
            if(board[i] === 'X' || board[i] === 'O') counter++;
        }
        return counter;
    }

    const checkDupe = (index) =>{
        if(board[index] === 'X' || board[index] === 'O'){
            return false;
        }else return true;
    }

    const checkWin = () => {
        for(let i = 0; i < WINNING_COMBINATIONS.length; i++){
            const [a, b, c] = WINNING_COMBINATIONS[i];
            if(board[a] === 'X' && board[b] === 'X' && board[c] === 'X' ){
                // console.log('X wins');
                return 'X wins';
            } else if (board[a] === 'O' && board[b] === 'O' && board[c] === 'O'){
                // console.log('O wins');
                return 'O wins';
            }
        }
        return false;
    };

    return{
        add,
        checkWin,
        checkDupe,
        checkFull,
        getBoard,
        indexBoard,
    }
})();

const displayController = (function() {
    let gridSpots = document.querySelectorAll(`.gridspot`);

    const addSpotListeners = (nodes, func) =>{
        nodes.forEach((item) =>{
            if(gameboard.checkDupe(item.dataset.index)){
                item.addEventListener('click', func);
            }
        })
    }

    const removeSpotListeners = (nodes, func) =>{
        nodes.forEach((item) =>{
            item.removeEventListener('click', func);
        })
    }

    const updateDisplay = () =>{
        gridSpots.forEach((square) => {
            square.textContent = gameboard.indexBoard(
              square.getAttribute("data-index")
            );
        });
    }

    const addMark = (index, mark) =>{
        let currentSquare = document.querySelector(`[data-index="${index}"]`);

        if(mark === 'X'){
            gameboard.add('X', index);
            currentSquare.textContent = 'X';
        }
        else{
            gameboard.add('O', index);
            currentSquare.textContent = 'O';
        } 
    }

    return{
        addSpotListeners,
        removeSpotListeners,
        updateDisplay,
        addMark,
    }
})(document);

function createPlayer(name, mark){
    let turn = 0;
    const changeTurn = () => {
        if(turn == 0) turn = 1;
        else if (turn == 1) turn = 0;
    }
    const getTurn = () => turn;
    const changeName = (newName) => name = newName;
    return {name, mark, getTurn, changeTurn, changeName};
}

const ticTacToe = (function(){
    let board = gameboard.getBoard();
    let win = false;
    let playerOne;
    let playerTwo;
    let gridSpots = document.querySelectorAll(`.gridspot`);
    let result = document.querySelector('#results');
    let dialog = document.querySelector('.restart');

    const play = () =>{
        let checkWin = gameboard.checkWin();
        let checkFull = gameboard.checkFull();
        if(checkWin === 'X wins'){
            console.log('X won');
            displayController.removeSpotListeners(gridSpots, playOne);
            displayController.removeSpotListeners(gridSpots, playTwo);
            result.textContent = `${playerOne.name} Wins!`
            dialog.showModal();
            win = true;
            return;
        }
        else if(checkWin === 'O wins'){
            console.log('O won');
            displayController.removeSpotListeners(gridSpots, playOne);
            displayController.removeSpotListeners(gridSpots, playTwo);
            result.textContent = `${playerTwo.name} Wins!`
            dialog.showModal();
            win = true;
            return;
        }
        else if(checkFull === 9){
            displayController.removeSpotListeners(gridSpots, playOne);
            displayController.removeSpotListeners(gridSpots, playTwo);
            result.textContent = `Tie!`
            dialog.showModal();
            return;
        }
        else if(playerOne.getTurn() === 1 && playerTwo.getTurn() === 0){
            displayController.removeSpotListeners(gridSpots, playTwo);
            displayController.addSpotListeners(gridSpots, playOne);
        }
        else if(playerTwo.getTurn() === 1 && playerOne.getTurn() === 0){
            displayController.removeSpotListeners(gridSpots, playOne);
            displayController.addSpotListeners(gridSpots, playTwo);
        }
    }

    const playOne = (spot) =>{
        const index =  spot.target.getAttribute("data-index");
        playerOne.changeTurn();
        playerTwo.changeTurn();
        displayController.addMark(index, 'X');
        displayController.updateDisplay();
        ticTacToe.play();
    }

    const playTwo = (spot) =>{
        const index =  spot.target.getAttribute("data-index");
        playerOne.changeTurn();
        playerTwo.changeTurn();
        displayController.addMark(index, 'O');
        displayController.updateDisplay();
        ticTacToe.play();
    }

    const restart = () =>{
        let i = 0;
        dialog.close();
        board.forEach(() =>{
            board[i] = ' ';
            i++;
        });
        displayController.updateDisplay();
        result.textContent = ` `;
        ticTacToe.play();
        i = 0;
    }

    const makePlayer = () =>{
        if(playerOne === undefined) {
            playerOne = createPlayer('Player 1', 'X');
            playerOne.changeTurn();
        }
        else if (playerTwo === undefined){
            playerTwo = createPlayer('Player 2', 'O');
        } 
    }

    return{
        play,
        restart,
        makePlayer,
    }
})(document);




ticTacToe.makePlayer();
ticTacToe.makePlayer();
ticTacToe.play();