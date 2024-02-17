const { getUserInput, closeReadLine } = require("./userInput");

let playerName: string = "";

async function main(): Promise<void> {
	playerName = await getUserInput("What's your name?\n");
	console.log(`Hello, ${playerName}`);
	closeReadLine();
}

main();
