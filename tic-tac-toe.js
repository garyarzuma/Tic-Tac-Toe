// factory function for Person 
const Person = (name) => {
    const changeName = (newName) => name=newName;
    const getName = () => name;
    return {changeName, getName};
}

//create default players
const Player1 = Person("Player 1");
const Player2 = Person("Player 2");

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
        if(gameBoard[arrayIndex] === "" && Game.getState() !== "GameOver"){
            gameBoard[arrayIndex] = Game.getState();
            drawBoard(); 
            checkWin();
            Game.changeTurn();
        }
    }

    const newGame = function(){
        gameBoard = ["", "", "", "", "","","","",""];
        drawBoard();
        Game.clearText();
        Game.setState();
        Player1.changeName("Player 1");
        Player2.changeName("Player 2");
        Game.updateNames();
    }

    const checkWin = function(){
        for(let i=0; i <= 6; i=i+3){
            if(gameBoard[i] === gameBoard [i+1] && gameBoard[i+1] === gameBoard[i+2] && gameBoard[i]!== ""){
                Game.gameOver();
                return;
            }
        }
        for(let i=0; i <= 2; i++){
            if(gameBoard[i] === gameBoard [i+3] && gameBoard[i+3] === gameBoard[i+6] && gameBoard[i]!== ""){
                Game.gameOver();
                return;
            }
        }
        if(gameBoard[0] === gameBoard [4] && gameBoard[4] === gameBoard[8] && gameBoard[0]!== ""){
                Game.gameOver();
                return;
        }
        if(gameBoard[2] === gameBoard [4] && gameBoard[4] === gameBoard[6] && gameBoard[2]!== ""){
                Game.gameOver();
                return;
        }  
        if(gameBoard.indexOf("") === -1){ //check for tie game if there are no "" in the array 
                Game.tieGame();
        }
    }

    //setup event listeners
    gameSquareDivs.forEach(event => event.addEventListener('click', takeTurn));
    newGameButton.addEventListener('click', newGame);

    return {drawBoard, newGame};

})();




const Game = ( function(){

    let playerTurnState = "X"; //x goes first
    const submitButtons = document.querySelectorAll(".SubmitButton");
    const player1NameDiv = document.querySelector(".player1");
    const player2NameDiv = document.querySelector(".player2");

    

    const getWinnerName = function(){
        return (playerTurnState === "X") ? Player1.getName():Player2.getName();
    }

    const changeTurn = function(){
        if(playerTurnState !== "GameOver"){
            playerTurnState = (playerTurnState === "X") ? "O" : "X";
        }
    }

    const getState = function(){
        return playerTurnState;
    }

    const setState = function(){
        playerTurnState = "X";
    }

    const gameOver = function(){
        resultsNode.textContent = `${getWinnerName()} Wins!`;
        playerTurnState = "GameOver";
    }

    const tieGame= function(){
        resultsNode.textContent = "Its a Tie!";
        plauerTurnState = "GameOver";
    }

    const clearText = function(){
        resultsNode.textContent = "";
    }

    const handleFormInput = function(e){
        const myForm = e.target.form;
        const whichPlayer = myForm[0].name;

        if(whichPlayer === "player1" && myForm.player1.value !== ""){
            Player1.changeName(myForm.player1.value);
            myForm.player1.value = "";
        } 
        else if (whichPlayer === "player2" && myForm.player2.value !== "") {
                Player2.changeName(myForm.player2.value);
                myForm.player2.value = "";
        }

        updateNames();
    }

    const updateNames = function(){
        player1NameDiv.textContent = Player1.getName();
        player2NameDiv.textContent = Player2.getName();
    }

    submitButtons.forEach(event => event.addEventListener('click', handleFormInput));
    resultsNode = document.querySelector(".results");

    return{updateNames, setState, getState, changeTurn, gameOver, tieGame, clearText}

})();






