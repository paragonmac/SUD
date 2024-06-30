// Function to load a YAML file
export async function loadYAML(url) {
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
export async function loadGameData() {
    try {
        const gameWorld = await loadYAML('/data/gameWorld.yaml');
        const items = await loadYAML('/data/items.yaml');
        const npcs = await loadYAML('/data/npcs.yaml');
        const creatures = await loadYAML('/data/creatures.yaml');
        const monsters = await loadYAML('/data/monsters.yaml');
        const hiddenThings = await loadYAML('/data/hiddenThings.yaml');
        const player = await loadYAML('/data/player.yaml');

        console.log('All YAML data loaded successfully');

        return {
            gameWorld: gameWorld.gameWorld,
            items: items.items,
            npcs: npcs.npcs,
            creatures: creatures.creatures,
            monsters: monsters.monsters,
            hiddenThings: hiddenThings.hiddenThings,
            player: player.player
        };
    } catch (error) {
        console.error('Error loading game data:', error);
        throw error;
    }
}
