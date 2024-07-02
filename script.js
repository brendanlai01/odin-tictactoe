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
    const add = (mark, position) => {
        board[position] = mark;
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
        board,
    }
})();
