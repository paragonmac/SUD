import { loadGameData } from './gameDataLoader.js';
import { initializeGame } from './gameInitializer.js';

// Start loading game data
loadGameData().then(data => {
    initializeGame(data);
}).catch(error => {
    console.error('Failed to start the game:', error);
});
