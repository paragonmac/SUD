import { assert } from './utils.js';
import { displayCurrentRoom, logToWorld, logToRoom, updateRoomWindow } from './drawWindows.js';
import { handleCommand } from './commandMap.js';
import { Player } from './Player.js';
import { Room } from './Room.js';

let player;
export { player };
const rooms = {};
export { rooms };

function spawnRoom(roomId, gameWorld) {
    if (!rooms[roomId]) {
        rooms[roomId] = new Room(roomId);
        rooms[roomId].initialize(gameWorld);
    }
    rooms[roomId].enter(gameWorld);
    player.currentRoom = rooms[roomId];
    displayCurrentRoom(player);
}

export function startGame(gameWorld) {
    const commandInput = document.getElementById('command-input');
    const sendCommandButton = document.getElementById('send-command');
    const inventoryButton = document.getElementById('inventory-button');
    const closeGameButton = document.getElementById('close-game-button');
    
    assert(commandInput, 'Command input element not found');
    assert(sendCommandButton, 'Send command button not found');
    assert(inventoryButton, 'Inventory button not found');
    assert(closeGameButton, 'Close game button not found');

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

    inventoryButton.addEventListener('click', () => {
        window.open('/components/inventory.html', 'Inventory', 'width=600,height=400');
        console.log('Opened inventory window');
    });

    closeGameButton.addEventListener('click', closeGame);

    // Display initial room description
    player = new Player("Billy", 'startingRoom');
    spawnRoom( 1, gameWorld);

    console.log('Game started');
}

export function startRandomEventLoop() {
    setInterval(() => {
        if (Math.random() < 0.01) {
            triggerRandomEvent();
        }
    }, 1000);
    console.log('Random event loop started');
}

function triggerRandomEvent() {
    const currentRoom = player.currentRoom;
    assert(currentRoom, 'Player is not in any room');
    if (currentRoom.events && currentRoom.events.length > 0) {
        const randomIndex = Math.floor(Math.random() * currentRoom.events.length);
        const randomEvent = currentRoom.events[randomIndex];
        logToWorld(randomEvent.message);
        console.log('Triggered random event:', randomEvent);
    }
}

export function closeGame() {
    logToWorld("The game is closing.");
    setTimeout(() => {
        window.close();
    }, 3000);
    console.log('Game closing');
}
