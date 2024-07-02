import { logToWorld } from './drawWindows.js';
import * as commands from './commands.js';

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


export const commandMap = {
    'move north': () => commands.move('north'), 
    'move south': () => commands.move('south'),
    'move east': () => move('east'),
    'move west': () => move('west'),
    'open inventory': commands.openInventory,
    'look': commands.displayCurrentRoom,
    'help': commands.help,
    
    // Add more commands and their handlers here
};
