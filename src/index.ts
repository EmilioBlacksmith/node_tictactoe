const { getUserInput, closeReadLine } = require("./userInput");

let playerName: string = "";

let board: string[][] = [
	["1", "2", "3"],
	["4", "5", "6"],
	["7", "8", "9"],
];

async function displayBoard(): Promise<void> {
	for (let i = 0; i < 3; i++) {
		let row: string = "";
		for (let j = 0; j < 3; j++) {
			row += ` ${board[i][j]} `;
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

async function main(): Promise<void> {
	displayBoard();
	closeReadLine();
}

main();
