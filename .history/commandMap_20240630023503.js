import { move, openInventory, help } from './commands.js';

export const commandMap = {
    'move north'||'north': () => move('north'),
    'move south': () => move('south'),
    'move east': () => move('east'),
    'move west': () => move('west'),
    'open inventory': openInventory,
    'help': help,
    // Add more commands and their handlers here
};
