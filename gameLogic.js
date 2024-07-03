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
        // Open inventory.html in a new window
        window.open('/components/inventory.html', 'Inventory', 'width=600,height=400');
        console.log('Opened inventory window');
    });

    closeGameButton.addEventListener('click', closeGame);

    // Display initial room description
    player = new Player("Billy");
    spawnRoom(1, gameWorld); // Initialize starting room

    console.log('Game started');
}

// Function to start the random event loop
export function startRandomEventLoop() {
    setInterval(() => {
        if (Math.random() < 0.01) { // 1% chance of triggering a random event
            triggerRandomEvent();
        }
    }, 1000); // Trigger a random event every second
    console.log('Random event loop started');
}

// Function to trigger a random event in the current room
function triggerRandomEvent() {
    const currentRoom = player.currentRoom; // Assuming the player starts in the first room
    if (currentRoom.events && currentRoom.events.length > 0) {
        const randomIndex = Math.floor(Math.random() * currentRoom.events.length);
        const randomEvent = currentRoom.events[randomIndex];
        logToWorld(randomEvent.message);
        console.log('Triggered random event:', randomEvent);
    }
}

// Function to gracefully close the game
export function closeGame() {
    // Notify players
    logToWorld("The game is closing.");

    // Cleanup resources
    // (e.g., close connections, stop sounds, free memory)

    // Close the window or redirect
    setTimeout(() => {
        window.close();
    }, 3000);  // Give players time to read the message

    console.log('Game closing');
}
