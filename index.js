
const DOM = (function() {
	const board = document.querySelector(".board");
	let turnX  = "X";
	let turnO  = "O";
	const cellElem = document.querySelectorAll(".piece")
	const pop = document.querySelector(".pop-up");
	const winText = document.querySelector("#WİN_TEXT");
	const overlay = document.querySelector(".overlay");
	const restartBtn = document.querySelector(".restart-btn")
	const clearBoardBtn = document.querySelector("#CLEAR_BOARD")
	const score1 = document.querySelector("#SCORE_1")
	const score2 = document.querySelector("#SCORE_2")
	const startBtn = document.querySelector("#START_BTN")
	const form = document.querySelector("#FORM")
	const player1Name = document.querySelector("#PLAYER1");
	const player2Name = document.querySelector("#PLAYER2");
	const player1Text = document.querySelector("#PLAYER1_TEXT")
	const player2Text = document.querySelector("#PLAYER2_TEXT")
	const getName = document.querySelector(".get-name");
	let scoreX = 1;
	let scoreO = 1;
	let isTurn;
	return{
		board,
		turnX,
		turnO,
		cellElem,
		pop,
		winText,
		overlay,
		restartBtn,
		clearBoardBtn,
		isTurn,
		score1,
		score2,
		scoreX,
		scoreO,
		startBtn,
		form,
		player1Name,
		player2Name,
		player1Text,
		player2Text,
		getName,
	}
})();
function startGame() {
	onload()
	let isTurn = false
	formControl()
	addPieceToBoard()
	winninglogic()
}
function addPieceToBoard(){
	DOM.cellElem.forEach((cell)=>{
	cell.addEventListener("click",addMark,{once:true})
	})
}
function formControl(){
	DOM.startBtn.addEventListener("click",(event)=>{
	if(DOM.player1Name.value=="" || DOM.player2Name.value=="")return
	event.preventDefault();
	DOM.getName.classList.remove("get-name-active");
	DOM.overlay.classList.remove("overlay-active");
	console.log(DOM.player1Name.value,DOM.player2Name.value)
	setNames()
	})
}
function onload(){
window.addEventListener('load',()=>{
	DOM.getName.classList.add("get-name-active");
	DOM.overlay.classList.add("overlay-active");
})
}
function setNames() {
	DOM.player1Text.textContent = DOM.player1Name.value;
	DOM.player2Text.textContent = DOM.player2Name.value;
}
function addMark (cell) {
	const currentTurn = DOM.isTurn ? DOM.turnO : DOM.turnX
	cell.target.classList.add(currentTurn);
	winninglogic()
	clearGame(currentTurn)
	clearBoard(currentTurn)
	switchTurn()	
}
function switchTurn() {
	DOM.isTurn = !DOM.isTurn
}
function  playerXWins() {
	DOM.winText.textContent = `Player ${DOM.player1Name.value} Wins`;
	DOM.pop.classList.add("pop-up-active");
	DOM.overlay.classList.add("overlay-active");
	DOM.score1.textContent = DOM.scoreX++;
	}
function  playerOWins() {
	DOM.winText.textContent = `Player ${DOM.player2Name.value} Wins`;
	DOM.pop.classList.add("pop-up-active");
	DOM.overlay.classList.add("overlay-active");
	DOM.score2.textContent = DOM.scoreO++;
	}
function tie() {
	DOM.winText.textContent = "DRAW";
	DOM.pop.classList.add("pop-up-active");
	DOM.overlay.classList.add("overlay-active");
	}
function clearGame(current) {
	DOM.restartBtn.addEventListener("click",(btn)=>{
	DOM.pop.classList.remove("pop-up-active");
	DOM.overlay.classList.remove("overlay-active");
	DOM.cellElem.forEach((cell)=>cell.classList.remove("O") || cell.classList.remove("X"));
	addPieceToBoard();	
		})
	}
function clearBoard(){
	DOM.clearBoardBtn.addEventListener("click",(btn)=>{
	DOM.cellElem.forEach((cell)=>cell.classList.remove("X")||cell.classList.remove("O"));	
	addPieceToBoard();
		})
	}
function winninglogic(){
	let wins = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6],
	]
	let winX = wins.some((comb)=>{
		return comb.every((index)=>{
			return DOM.cellElem[index].classList.contains('X')
			
		})
	})
	 let winO = wins.some((comb)=>{
		return comb.every((index)=>{
			return DOM.cellElem[index].classList.contains('O')
		})
	}) 

	 if (winX) {
		playerXWins()
		console.log('sad')
	} else if (winO) {
		playerOWins()
	}
	else if ([...DOM.cellElem].every(item=>item.classList.contains("X")||item.classList.contains("O")) == true) {
		tie()
	}  
}
startGame()



	