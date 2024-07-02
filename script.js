const gameboard = (function() {
    let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let playerOneWins = 0;
    let playerTwoWins = 0;
    const add = (mark, position) => {
        board[position] = mark;
    };
    const checkWins = () => {
        if(playerOneWins === 3 || playerTwoWins === 3){

        }
    };

    return{
        add,
        checkWins,
        board,
    }
})();
