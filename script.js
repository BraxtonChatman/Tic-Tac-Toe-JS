
function createPlayer(num, marker){
    let number = num;
    let mark = marker;

    const getTileClass = ()=>{return "clicked"+number};

    const getMarker = ()=>{return mark};
    return {getMarker, getTileClass};
}

function createGameboard(){
    const board = ["", "", "", "", "", "", "", "", ""];
    let winner = "";
    let spacesFilled = 0;
    let gameOver = false;
    
    const setPosition = function(index, marker){
        if(board[index] !== "" || gameOver)
            return false;
        board[index] = marker;
        spacesFilled++;
        checkWinner();
        if(winner !== "" || spacesFilled > 8){
            gameOver = true;
        }
        return true;
    }

    const isGameOver = function(){
        return gameOver;
    };

    const checkWinner = function(){
        for(let i=0; i<7; i+=3){
            if(
                board[i] === board[i+1] && 
                board[i+1] === board[i+2] && 
                board[i] !== ""){
                    winner = board[i];
                }
            let j = i/3;
            if(
                board[j] === board[j+3] && 
                board[j+3] === board[j+6] && 
                board[j] !== ""){
                    winner = board[j];
                }
        }
        if(board[0] === board[4] && board[4] === board[8] && board[0] !== ""){
            winner = board[0];
        }
        if(board[2] === board[4] && board[4] === board[6] && board[2] !== ""){
            winner = board[2];
        }
    }

    const getWinner = function(){return winner;};

    const printBoard = function(){console.log(board);};

    return {setPosition, printBoard, isGameOver, getWinner};
}

function createGame(){
    const gameboard = createGameboard();
    const gameboardUI = document.querySelectorAll(".item");
    const players = [createPlayer(1, "x"), createPlayer(2, "o")];
    let playerTurn = 0;
    let currentPlayer = players[playerTurn];

    gameboardUI.forEach((item)=>{
        item.addEventListener("click", tileListener)
    });

    function tileListener(e){
        if(gameboard.setPosition(e.target.id.at(-1), currentPlayer.getMarker())){
            e.target.classList.toggle(currentPlayer.getTileClass());
            e.target.textContent = currentPlayer.getMarker();
            currentPlayer = players[(++playerTurn%2)];
            if(gameboard.isGameOver()){
                let winner = gameboard.getWinner();
                if(winner === ""){
                    console.log("Tie Game");
                }
                else if(winner === players[0].getMarker()){
                    console.log("Player 1 wins!");
                }
                else{
                    console.log("Player 2 wins!");
                }
            }
        }
    }

    return {gameboard};
}

const game = createGame();
