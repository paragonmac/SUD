// Function to log messages to the world window
export function logToWorld(message) {
    const worldWindow = document.getElementById('world-window');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    worldWindow.appendChild(messageElement);
    worldWindow.scrollTop = worldWindow.scrollHeight;  // Auto-scroll to bottom
    console.log('Logged to world window:', message);
}

// Function to start the game
export function startGame() {
    const commandInput = document.getElementById('command-input');
    const sendCommandButton = document.getElementById('send-command');
    const inventoryButton = document.getElementById('inventory-button');
    const closeGameButton = document.getElementById('close-game-button');

    function handleCommand(command) {
        logToWorld(`ed: ${command}`);
        console.log('Handled command:', command);
        // Add command logic here to handle commands
    }

    sendCommandButton.addEventListener('click', () => {
        const command = commandInput.value;
        commandInput.value = '';
        handleCommand(command);
    });

    commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendCommandButton.click();
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

    // Start random event loop
    startRandomEventLoop();

    console.log('Game started');
}

// Function to display the current room
export function displayCurrentRoom() {
    const currentRoom = window.gameWorld.rooms[0]; // Assuming the player starts in the first room
    logToWorld(currentRoom.description);
    if (currentRoom.detailed_description) {
        logToWorld(currentRoom.detailed_description);
    }
    if (currentRoom.exits) {
        logToWorld('Exits:');
        currentRoom.exits.forEach(exit => {
            logToWorld(`- ${exit.direction}: ${exit.description}`);
        });
    }
    if (currentRoom.items.length > 0) {
        logToWorld('Items in the room:');
        currentRoom.items.forEach(item => {
            if (!item) {
                console.error(`Item not found in current room: ${currentRoom.id}`);
            } else {
                logToWorld(`- ${item.name}: ${item.description}`);
            }
        });
    }
    if (currentRoom.livingThings.length > 0) {
        logToWorld('Living things in the room:');
        currentRoom.livingThings.forEach(thing => {
            if (!thing) {
                console.error(`Living thing not found in current room: ${currentRoom.id}`);
            } else {
                logToWorld(`- ${thing.name}: ${thing.description}`);
            }
        });
    }
    if (currentRoom.hiddenThings.length > 0) {
        logToWorld('Hidden things in the room:');
        currentRoom.hiddenThings.forEach(hidden => {
            if (!hidden) {
                console.error(`Hidden thing not found in current room: ${currentRoom.id}`);
            } else {
                logToWorld(`- ${hidden.name}: ${hidden.description}`);
            }
        });
    }
    if (currentRoom.monsters.length > 0) {
        logToWorld('Monsters in the room:');
        currentRoom.monsters.forEach(monster => {
            if (!monster) {
                console.error(`Monster not found in current room: ${currentRoom.id}`);
            } else {
                logToWorld(`- ${monster.name}: ${monster.description}`);
            }
        });
    }

    console.log('Displayed current room:', currentRoom);
}

// Function to start the random event loop
export function startRandomEventLoop() {
    setInterval(() => {
        if(Math.random() < 0.01) { // 1% chance of triggering a random event
        triggerRandomEvent();
        }
    }, 1000); // Trigger a random event every 5 seconds
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
