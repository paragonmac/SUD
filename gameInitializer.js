import { assert } from './utils.js';

export function initializeGame(data) {
    const { gameWorld, items, npcs, creatures, monsters, hiddenThings } = data;

    assert(gameWorld, 'Game world data is missing');
    assert(items, 'Items data is missing');
    assert(npcs, 'NPCs data is missing');
    assert(creatures, 'Creatures data is missing');
    assert(monsters, 'Monsters data is missing');
    assert(hiddenThings, 'Hidden things data is missing');

    gameWorld.rooms.forEach(room => {
        room.items = room.items.map(itemKey => {
            assert(items[itemKey], `Item key not found: ${itemKey}`);
            return items[itemKey];
        });
        room.livingThings = room.livingThings.map(livingThingKey => {
            assert(npcs[livingThingKey] || creatures[livingThingKey], `Living thing key not found: ${livingThingKey}`);
            return npcs[livingThingKey] || creatures[livingThingKey];
        });
        room.hiddenThings = room.hiddenThings.map(hiddenThingKey => {
            assert(hiddenThings[hiddenThingKey], `Hidden thing key not found: ${hiddenThingKey}`);
            return hiddenThings[hiddenThingKey];
        });
        room.monsters = room.monsters.map(monsterKey => {
            assert(monsters[monsterKey], `Monster key not found: ${monsterKey}`);
            return monsters[monsterKey];
        });
    });

    window.gameWorld = gameWorld;
    console.log('Game world initialized:', gameWorld);
}
