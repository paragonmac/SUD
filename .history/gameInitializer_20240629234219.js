// Function to initialize the game with loaded data
export function initializeGame(data) {
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
