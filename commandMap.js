import { logToWorld } from './drawWindows.js';
import * as commands from './commands.js';
import { player } from './gameLogic.js';

export function handleCommand(input) {
    const matchedCommands = Object.keys(commandMap).filter(command =>
        command.startsWith(input.toLowerCase())
    );

    if (matchedCommands.length === 1) {
        commandMap[matchedCommands[0]](); // Execute the matched command
    } else if (matchedCommands.length > 1) {
        logToWorld(`Ambiguous command. Did you mean: ${matchedCommands.join(', ')}`);
    } else {
        logToWorld(`Unknown command: ${input}.`);
    }
}

export const commandMap = {
    'move north': () => commands.move('north'), 
    'move south': () => commands.move('south'),
    'move east': () => commands.move('east'),
    'move west': () => commands.move('west'),
    'go north': () => commands.move('north'), 
    'go south': () => commands.move('south'),
    'go east': () => commands.move('east'),
    'go west': () => commands.move('west'),
    'open inventory': commands.openInventory,
    'look': commands.fetchCurrentRoom,
    'help': commands.help,
    'playerDebug': commands.playerDebug,
};

const keyDirectionMap = { // works with eventListener bellow
    'Numpad8': 'north',
    'Numpad6': 'east',
    'Numpad2': 'south',
    'Numpad4': 'west',
    'Numpad9': 'northeast',
    'Numpad3': 'southeast',
    'Numpad1': 'southwest',
    'Numpad7': 'northwest',
};
document.addEventListener('keydown', (event) => {
    const key = event.code;
    if (key in keyDirectionMap) {
        const direction = keyDirectionMap[key];
        commands.move(direction);
    }   
});