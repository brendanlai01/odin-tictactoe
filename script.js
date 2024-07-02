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
        board[position] = mark;
        displayController.display();
        checkWin();
    };
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
        getBoard,
        indexBoard,
    }
})();

const displayController = (function() {
    const display = () =>{
        console.log(`Current gameboard array: ${gameboard.board}`);
        console.log('Current game board display:')
        console.log(
            `
            ${gameboard.board[0]} | ${gameboard.board[1]} | ${gameboard.board[2]}
            ----------
            ${gameboard.board[3]} | ${gameboard.board[4]} | ${gameboard.board[5]}
            ----------
            ${gameboard.board[6]} | ${gameboard.board[7]} | ${gameboard.board[8]}
            `
        );
    }

    return{
        display,
    }
})();
