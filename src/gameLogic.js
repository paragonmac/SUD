import { assert } from './utils.js';
import { displayCurrentRoom, logToWorld, logToRoom, updateRoomWindow } from './drawWindows.js';
import { handleCommand } from './commandMap.js';
import { Player } from './Player.js';
import { Room } from './Room.js';
import { updateCompass } from './imageHandler.js';
import * as eventManager from './eventManager.js';

let player;
export { player };
const rooms = [];
export { rooms };


function spawnRoom(roomId, gameWorld) {
    if (!rooms[roomId]) {
        rooms[roomId] = new Room(roomId, gameWorld);
    }
    rooms[roomId].enter(gameWorld);
    player.currentRoom = rooms[roomId];
    displayCurrentRoom(player, gameWorld);
}

export function startGame(gameWorld) {
    const commandInput = document.getElementById('command-input');
    const sendCommandButton = document.getElementById('send-command');
    const roundTimeBar = document.getElementById('roundTimeProgress');
    const roundTimeText = document.getElementById('roundTimeText');
    const leftHandText = document.getElementById('leftHandText');
    const rightHandText = document.getElementById('rightHandText');
    const engagementBar = document.getElementById('engagementProgress');
    const engagementText = document.getElementById('engagementText');

    assert(commandInput, 'Command input element not found');
    assert(sendCommandButton, 'Send command button not found');

    sendCommandButton.addEventListener('click', () => {
        const command = commandInput.value;
        commandInput.value = '';
        logToWorld('>: ' + command);
        handleCommand(command);
    });

    commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value;
            commandInput.value = '';
            logToWorld('>: ' + command);
            handleCommand(command);
        }
    });

    // Display initial room description
    player = new Player("Billy", 'startingRoom');
    spawnRoom( 1, gameWorld);
    updateCompass(player.currentRoom);

    console.log('Game started');
}
export function closeGame() {
    logToWorld("The game is closing.");
    setTimeout(() => {
        window.close();
    }, 3000);
    console.log('Game closing');
}
