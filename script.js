const gameboard = (function() {
    let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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
    let playerOneWins = 0;
    let playerTwoWins = 0;

    const getBoard = () => {
        return board;
    }
    const indexBoard = (index) => {
        return board[index];
    }
    const add = (mark, position) => {
        mark.toUpperCase();
        // if(checkDupe() === false){
        //     displayController.display();
        //     return console.log(`Spot already filled at board index: ${position}`);
        // }
        // else{
            board[position] = mark;
        //     displayController.display();
        //     checkWin();
        // }
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
                return console.log('X wins');
            } else if (board[a] === 'O' && board[b] === 'O' && board[c] === 'O'){
                return console.log('O wins');
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
    const display = () =>{
        console.log(`Current gameboard array: ${gameboard.getBoard()}`);
        console.log('Current game board display:')
        console.log(
            `
            ${gameboard.indexBoard(0)} | ${gameboard.indexBoard(1)} | ${gameboard.indexBoard(2)}
            ----------
            ${gameboard.indexBoard(3)} | ${gameboard.indexBoard(4)} | ${gameboard.indexBoard(5)}
            ----------
            ${gameboard.indexBoard(6)} | ${gameboard.indexBoard(7)} | ${gameboard.indexBoard(8)}
            `
        );
    }

    return{
        display,
    }
})();
