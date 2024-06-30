// Function to load a YAML file
async function loadYAML(url) {
    const response = await fetch(url);
    const text = await response.text();
    return jsyaml.load(text);
}

// Function to load all game data from YAML files
async function loadGameData() {
    const gameWorld = await loadYAML('/data/gameWorld.yaml');
    const items = await loadYAML('/data/items.yaml');
    const npcs = await loadYAML('/data/npcs.yaml');
    const creatures = await loadYAML('/data/creatures.yaml');
    const monsters = await loadYAML('/data/monsters.yaml');

    const combinedData = {
        gameWorld: gameWorld.gameWorld,
        items: items.items,
        npcs: npcs.npcs,
        creatures: creatures.creatures,
        monsters: monsters.monsters
    };

    initializeGame(combinedData);
}

// Function to initialize the game with loaded data
function initializeGame(data) {
    const { gameWorld, items, npcs, creatures, monsters } = data;

    // Map item, NPC, creature, and monster references to their full data
    gameWorld.rooms.forEach(room => {
        room.items = room.items.map(itemKey => items[itemKey]);
        room.livingThings = room.livingThings.map(livingThingKey => npcs[livingThingKey] || creatures[livingThingKey]);
        room.hiddenThings = room.hiddenThings.map(hiddenThingKey => items[hiddenThingKey]);
        room.monsters = room.monsters.map(monsterKey => monsters[monsterKey]);
    });

    // Store the game world in a global variable for easy access
    window.gameWorld = gameWorld;

    // Log the game world for debugging purposes
    console.log(gameWorld);

    // Start the game
    startGame();
}

// Function to start the game
function startGame() {
    const worldWindow = document.getElementById('world-window');
    const commandInput = document.getElementById('command-input');
    const sendCommandButton = document.getElementById('send-command');
    const inventoryButton = document.getElementById('inventory-button');
    const closeGameButton = document.getElementById('close-game-button');

    function logToWorld(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        worldWindow.appendChild(messageElement);
        worldWindow.scrollTop = worldWindow.scrollHeight;  // Auto-scroll to bottom
    }

    function handleCommand(command) {
        logToWorld(`You entered: ${command}`);
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
    });

    closeGameButton.addEventListener('click', closeGame);

    // Display initial room description
    displayCurrentRoom();
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
            logToWorld(`- ${item.name}: ${item.description}`);
        });
    }
    if (currentRoom.livingThings.length > 0) {
        logToWorld('Living things in the room:');
        currentRoom.livingThings.forEach(thing => {
            logToWorld(`- ${thing.name}: ${thing.description}`);
        });
    }
    if (currentRoom.hiddenThings.length > 0) {
        logToWorld('Hidden things in the room:');
        currentRoom.hiddenThings.forEach(hidden => {
            logToWorld(`- ${hidden.name}: ${hidden.description}`);
        });
    }
    if (currentRoom.monsters.length > 0) {
        logToWorld('Monsters in the room:');
        currentRoom.monsters.forEach(monster => {
            logToWorld(`- ${monster.name}: ${monster.description}`);
        });
    }
}

