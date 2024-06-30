// Function to load a YAML file
async function loadYAML(url) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        console.log(`Loaded YAML from ${url}`);
        return jsyaml.load(text);
    } catch (error) {
        console.error(`Error loading YAML from ${url}:`, error);
    }
}

// Function to load all game data from YAML files
async function loadGameData() {
    try {
        const gameWorld = await loadYAML('/data/gameWorld.yaml');
        const items = await loadYAML('/data/items.yaml');
        const npcs = await loadYAML('/data/npcs.yaml');
        const creatures = await loadYAML('/data/creatures.yaml');
        const monsters = await loadYAML('/data/monsters.yaml');

        console.log('All YAML data loaded successfully');

        const combinedData = {
            gameWorld: gameWorld.gameWorld,
            items: items.items,
            npcs: npcs.npcs,
            creatures: creatures.creatures,
            monsters: monsters.monsters
        };

        initializeGame(combinedData);
    } catch (error) {
        console.error('Error loading game data:', error);
    }
}

// Function to initialize the game with loaded data
function initializeGame(data) {
    const { gameWorld, items, npcs, creatures, monsters } = data;

    // Verify that data has been loaded correctly
    if (!items || !npcs || !creatures || !monsters) {
        console.error("Error: Missing data. Check your YAML files.");
        return;
    }

    // Map item, NPC, creature, and monster references to their full data
    gameWorld.rooms.forEach(room => {
        room.items = room.items.map(itemKey => {
            if (!items[itemKey]) {
                console.error(`Item key not found: ${itemKey}`);
            }
            return items[itemKey];
        });
        room.livingThings = room.livingThings.map(livingThingKey => {
            if (!npcs[livingThingKey] && !creatures[livingThingKey]) {
                console.error(`Living thing key not found: ${livingThingKey}`);
            }
            return npcs[livingThingKey] || creatures[livingThingKey];
        });
        room.hiddenThings = room.hiddenThings.map(hiddenThingKey => {
            if (!items[hiddenThingKey]) {
                console.error(`Hidden thing key not found: ${hiddenThingKey}`);
            }
            return items[hiddenThingKey];
        });
        room.monsters = room.monsters.map(monsterKey => {
            if (!monsters[monsterKey]) {
                console.error(`Monster key not found: ${monsterKey}`);
            }
            return monsters[monsterKey];
        });
    });

    // Store the game world in a global variable for easy access
    window.gameWorld = gameWorld;

    // Log the game world for debugging purposes
    console.log('Game world initialized:', gameWorld);

    // Start the game
    startGame();
}

// Function to log messages to the world window
function logToWorld(message) {
    const worldWindow = document.getElementById('world-window');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    worldWindow.appendChild(messageElement);
    worldWindow.scrollTop = worldWindow.scrollHeight;  // Auto-scroll to bottom
    console.log('Logged to world window:', message);
}

// Function to start the game
function startGame() {
    const commandInput = document.getElementById('command-input');
    const sendCommandButton = document.getElementById('send-command');
    const inventoryButton = document.getElementById('inventory-button');
    const closeGameButton = document.getElementById('close-game-button');

    function handleCommand(command) {
        logToWorld(`You entered: ${command}`);
        console.log('Handled command:', command);
        // Add game logic here to handle commands
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
function displayCurrentRoom() {
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
function startRandomEventLoop() {
    setInterval(() => {
        if(Math.random() < 0.1) { // 10% chance of triggering a random event
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
function closeGame() {
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

// Start loading game data
loadGameData();
