import { logToWorld } from './drawWindows.js';

export const commandMap = {
    'move north': () => move('north'),
    'move south': () => move('south'),
    'move east': () => move('east'),
    'move west': () => move('west'),
    'open inventory': openInventory,
    'look': displayCurrentRoom,
    'help': help,
    // Add more commands and their handlers here
};

export function handleCommand(input) {
    const matchedCommands = Object.keys(commandMap).filter(command =>
        command.startsWith(input.toLowerCase())
    );

    if (matchedCommands.length === 1) {
        commandMap[matchedCommands[0]](); // Execute the matched command
    } else if (matchedCommands.length > 1) {
        logToWorld(`Ambiguous command. Did you mean: ${matchedCommands.join(', ')}`);
    } else {
        logToWorld(`Unknown command:  ${input}.`);
    }
}
