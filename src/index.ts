const { getUserInput, closeReadLine } = require("./userInput");

type Board = string[][];

let isGameOver: boolean = false;

const startingBoard: Board = [
	["1", "2", "3"],
	["4", "5", "6"],
	["7", "8", "9"],
];

let gameBoard: Board = [
	["x", "2", "3"],
	["4", "x", "6"],
	["7", "x", "o"],
];

function displayBoard() {
	console.clear();
	for (let i = 0; i < 3; i++) {
		let row: string = "";
		for (let j = 0; j < 3; j++) {
			row += ` ${gameBoard[i][j]} `;
			if (j < 2) {
				row += "|";
			}
		}
		console.log(row);
		if (i < 2) {
			console.log("---|---|---");
		}
	}
	console.log("\n");
}

function makeMove(posToSearch: string, playerToMakeMove: string): boolean {
	let found: boolean = false;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (gameBoard[i][j] === posToSearch) {
				found = true;
				gameBoard[i][j] = playerToMakeMove;
				break;
			}
		}
		if (found) break;
	}
	return found;
}

function initialSetup() {
	gameBoard = startingBoard;
	console.clear();
}

function checkWin(board: Board): string | null {
	const size = board.length;

	// Check Rows and Columns
	for (let i = 0; i < size; i++) {
		if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
			isGameOver = true;
			return board[i][0];
		}
		if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
			isGameOver = true;
			return board[0][i];
		}
	}

	// Check Diagonals
	if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
		isGameOver = true;
		return board[0][0];
	}
	if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
		isGameOver = true;
		return board[0][2];
	}

	// Tie

	if (
		gameBoard.every((row) =>
			row.every(
				(cell) =>
					cell !== "1" &&
					cell !== "2" &&
					cell !== "3" &&
					cell !== "4" &&
					cell !== "5" &&
					cell !== "6" &&
					cell !== "7" &&
					cell !== "8" &&
					cell !== "9"
			)
		)
	) {
		isGameOver = true;
		return "nobody won, it's a tie...";
	}

	//No Winner Yet
	isGameOver = false;
	return null;
}

async function gameLoop(): Promise<void> {
	// Player 1 Make Move
	// Player 2 Make Move
	// Win Check

	do {
		console.log("\n");
		displayBoard();
		let successMove: boolean = false;
		while (!successMove) {
			let playerMove = await getUserInput("Player 1 (o) - Where is your move?");
			successMove = makeMove(playerMove, "o");
		}

		const winner = checkWin(gameBoard);
		displayBoard();
		if (winner) {
			if (winner === "o") {
				console.log("The winner is Player 1 (o), Congratulations!");
			} else if (winner === "x") {
				console.log("The winner is Player 2 (x), Congratulations!");
			} else {
				console.log("hehe, ", winner);
			}
			break;
		}

		displayBoard();
		successMove = false; // Reset successMove here
		while (!successMove) {
			// Fix condition here
			let playerMove = await getUserInput("Player 2 (x) - Where is your move?");
			successMove = makeMove(playerMove, "x");
		}

		const winner2 = checkWin(gameBoard); // Call checkWin again
		displayBoard();
		if (winner2) {
			if (winner2 === "o") {
				console.log("The winner is Player 1 (o), Congratulations!");
			} else if (winner2 === "x") {
				console.log("The winner is Player 2 (x), Congratulations!");
			} else {
				console.log("Hehe, ", winner2);
			}
			break;
		}
	} while (!isGameOver);

	closeReadLine();
}

async function main(): Promise<void> {
	initialSetup();

	displayBoard();
	console.log("Welcome to the game of tic tac toe!");
	console.log(
		"You're going to play 1v1, one player will be (x) and the other (o)."
	);
	console.log("each number represent the position to make the move.");
	await getUserInput("[- PRESS ENTER TO START -]");

	await gameLoop();

	closeReadLine();
}

main();
