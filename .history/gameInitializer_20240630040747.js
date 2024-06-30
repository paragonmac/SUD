import { Player } from "./player";
export function initializeGame(data) {
    const { gameWorld, player, items, npcs, creatures, monsters, hiddenThings } = data;

    // Verify that data has been loaded correctly
    if (!items || !npcs || !creatures || !monsters || !hiddenThings) {
        console.error("Error: Missing data. Check your YAML files.");
        return;
    }

    // Map item, NPC, creature, monster, and hidden thing references to their full data
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
            if (!hiddenThings[hiddenThingKey]) {
                console.error(`Hidden thing key not found: ${hiddenThingKey}`);
            }
            return hiddenThings[hiddenThingKey];
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
    player = new Player('Billy'); 

    // Log the game world for debugging purposes
    console.log('Game world initialized:', gameWorld);

}
