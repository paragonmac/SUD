import { assert } from './utils.js';

export function initializeGame(data) { //this function is taking shit from yaml and putting into the gameworld
    const { gameWorld, items, npcs, creatures, monsters, hiddenThings, weapons} = data;

    assert(gameWorld, 'Game world data is missing');
    assert(items, 'Items data is missing');
    assert(npcs, 'NPCs data is missing');
    assert(creatures, 'Creatures data is missing');
    assert(monsters, 'Monsters data is missing');
    assert(hiddenThings, 'Hidden things data is missing');
    assert(weapons, 'Weapons data is missing');

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
    });

    window.gameWorld = gameWorld;
    console.log('Game world initialized:', gameWorld);
}
