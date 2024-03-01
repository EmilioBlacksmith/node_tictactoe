const readline = require("node:readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.setMaxListeners(15);

/**
 * Prompts the user with a question and returns a promise that resolvers to the user's input.
 * @param question question The question to prompt the user with.
 * @returns A promise that resolves to the user's input.
 */
function getUserInput(question: string): Promise<string> {
	return new Promise((resolve, reject) => {
		rl.question(question, (input: string) => {
			resolve(input);
		});
		rl.on("close", () => {
			reject(new Error("Readline interface closed unexpectedly."));
		});
	});
}

/**
 * Closes the readline interface.
 */
function closeReadLine() {
	rl.close();
}

module.exports = { getUserInput, closeReadLine };
