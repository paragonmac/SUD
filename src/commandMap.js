import { logToWorld } from './drawWindows.js';
import * as commands from './commands.js';
import { player } from './gameLogic.js';
import { Player } from './Player.js';


let firstWord;
let secondWord;
let thirdWord;
let fourthWord;


export function handleCommand(input) {
    const trimInput = input.trim();
    const lnputWords = trimInput.split(/\s+/);

    firstWord = lnputWords[0] || null;
    secondWord = lnputWords[1] || null;
    thirdWord = lnputWords[2] || null;
    fourthWord = lnputWords[3] || null;

    console.log('Player command:', firstWord, secondWord, thirdWord, fourthWord);

    const matchedCommands = Object.keys(commandMap).filter(command =>
        command.startsWith(firstWord.toLowerCase())
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
    'move out': () => commands.move('out'),
    'go north': () => commands.move('north'), 
    'go south': () => commands.move('south'),
    'go east': () => commands.move('east'),
    'go west': () => commands.move('west'),
    'go out': () => commands.move('out'),
    'open inventory': commands.openInventory,
    'look': commands.fetchCurrentRoom,
    'help': commands.help,
    //'get': commands.equipItem(),
    'status': commands.playerDisplayStatus,
    'jump': () => commands.roundTimeCheck(commands.jump, 7),
    'swap': () => commands.swap(),
    'target': () => commands.targetMonster(secondWord || null),
    'monsterlist': () => commands.listMonsters(),
    'advance': () => player.playerEngage(secondWord, thirdWord || null),
    'engage': () => player.playerEngage(secondWord, thirdWord || null),
    'find': () => commands.findMonster(secondWord, thirdWord || null),
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
    'Numpad5': 'out',
    'NumpadAdd': 'look',
};
document.addEventListener('keydown', (event) => {
    const key = event.code;
    if (key in keyDirectionMap) {
        if(key === 'NumpadAdd'){
            commands.fetchCurrentRoom();
        }else{
        const direction = keyDirectionMap[key];
        commands.move(direction);
        }
    }   
});