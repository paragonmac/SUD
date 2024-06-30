import { displayCurrentRoom, logToWorld, logToRoom, updateRoomWindow } from './drawWindows.js';
import { initializeGame } from './gameInitializer.js';
import { loadGameData } from './gameDataLoader.js';

// Function to start the game
export function startGame() {
    const commandInput = document.getElementById('command-input');
    const sendCommandButton = document.getElementById('send-command');
    const inventoryButton = document.getElementById('inventory-button');
    const closeGameButton = document.getElementById('close-game-button');

    function handleCommand(command) {
        //logToWorld(`>: ${command}`);
        console.log('Handled command:', command);
        // Add command logic here to handle commands
    }

    sendCommandButton.addEventListener('click', () => {
        const command = commandInput.value;
        commandInput.value = '';
        handleCommand(command);
        console.log('Handled command:', command);
        
    });

    commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value;
            commandInput.value = '';
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
    displayCurrentRoom();



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
    const currentRoom = window.gameWorld.rooms[0]; // Assuming the player starts in the first room
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

// Start loading game data and initialize the game
loadGameData().then(data => {
    initializeGame(data);
    startGame();

    // Start regular events and delayed events
    startRandomEventLoop();
}).catch(error => {
    console.error('Failed to start the game:', error);
});
