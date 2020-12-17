//Module with instant function call
const Gameboard = ( function(){
    const gameBoardDiv = document.getElementById("gameBoard");
    const gameSquareDivs = document.querySelectorAll(".gameSquare");

    let gameBoard = [ "X", "O", "X", "X", "O", "X", "X", "O", "X", ];

    const drawBoard = function(){
        let i=0;
        gameBoard.forEach(element => gameSquareDivs[i++].textContent = element);
    }
    return {drawBoard};
  })();

Gameboard.drawBoard();



// factory function for Person 
const Person = () => {
    const doSomething = () => console.log("testPerson");
    return {doSomething};
}

const player1 = Person();


