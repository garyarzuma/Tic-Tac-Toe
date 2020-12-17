//Module with instant function call
const Gameboard = ( function(){

    const gameBoardDiv = document.getElementById("gameBoard");
    const gameSquareDivs = document.querySelectorAll(".gameSquare");
    const newGameButton = document.querySelector(".newGameButton");
    
    
    let gameBoard = [ "", "", "", "", "", "", "", "", "", ];

    const drawBoard = function(){
        let i=0;
        gameBoard.forEach(element => gameSquareDivs[i++].textContent = element);
    }

    const takeTurn = function(event){
        let arrayIndex = event.target.dataset.array;
        if(gameBoard[arrayIndex] === ""){
            gameBoard[arrayIndex] = Game.getState();
            drawBoard(); 
            checkWin();
            Game.changeTurn();
        }
    }

    const newGame = function(){
        gameBoard = ["", "", "", "", "","","","",""];
        drawBoard();
        Game.setState();
    }

    const checkWin = function(){
        for(let i=0; i <= 6; i=i+3){
            if(gameBoard[i] === gameBoard [i+1] && gameBoard[i+1] === gameBoard[i+2] && gameBoard[i]!== ""){
                gameOver();
                return;
            }
        }
        for(let i=0; i <= 2; i++){
            if(gameBoard[i] === gameBoard [i+3] && gameBoard[i+3] === gameBoard[i+6] && gameBoard[i]!== ""){
                gameOver();
                return;
            }
        }
        if(gameBoard[0] === gameBoard [4] && gameBoard[4] === gameBoard[8] && gameBoard[0]!== ""){
                gameOver();
                return;
        }
        if(gameBoard[2] === gameBoard [4] && gameBoard[4] === gameBoard[6] && gameBoard[2]!== ""){
                gameOver();
                return;
        }  
        if(gameBoard.indexOf("") === -1){ //check for tie game if there are no "" in the array 
            tieGame();
        }
    }

    const gameOver = function(){
        console.log("gameover" + Game.getState())
    }

    const tieGame= function(){
        console.log("tiegame" + Game.getState())
    }

    gameSquareDivs.forEach(event => event.addEventListener('click', takeTurn));
    newGameButton.addEventListener('click', newGame);

    return {drawBoard};

  })();

Gameboard.drawBoard();

const Game = ( function(){

    let playerTurnState = "X"; //x goes first

    const changeTurn = function(){
        playerTurnState = (playerTurnState === "X") ? "O" : "X";
    }

    const getState = function(){
        return playerTurnState;
    }

    const setState = function(){
        playerTurnState = "X";
    }

    return{setState, getState, changeTurn}

})();
// factory function for Person 
const Person = (name) => {
    const doSomething = () => console.log("testPerson");
    return {name};
}

const Player1 = Person("jeff");



