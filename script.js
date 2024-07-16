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
            currentSquare.textContent = 'X';
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
    let win = false;
    let playerOne;
    let playerTwo;
    let gridSpots = document.querySelectorAll(`.gridspot`);

    const play = () =>{
        win = false;
        do{
            if(gameboard.checkWin()){
                win = true;
                break;
           }
            if(turnCounter === 1){
                 playerTurn = prompt(" (X's Turn) Where do you want to place your mark?");
                 playerTurn = parseInt(`${playerTurn}`);
                 if(gameboard.checkDupe(playerTurn)){
                    gameboard.add('X', playerTurn);
                    displayController.display();
                    turnCounter = 2;
                    continue;
                 }else{
                    alert('Spot is already taken! Rethink of a spot.')
                    continue;
                 }
            }
            if(turnCounter === 2){
                playerTurn = prompt(" (O's Turn) Where do you want to place your mark?");
                playerTurn = parseInt(`${playerTurn}`);
                if(gameboard.checkDupe(playerTurn)){
                    gameboard.add('O', playerTurn);
                    displayController.display();
                    turnCounter = 1;
                    continue;
                 }else{
                    alert('Spot is already taken! Rethink of a spot.')
                    continue;
                 }
           }
           
        } while(win === false)
    }

    const makePlayer = (name, mark) =>{
        if(playerOne === undefined) playerOne = createPlayer(name, mark);
        else if (playerTwo === undefined) playerTwo = createPlayer(name, mark);
    }

    return{
        play,
        makePlayer,
    }
})();

displayController.display();