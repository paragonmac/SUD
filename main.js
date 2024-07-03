import { loadGameData } from './gameDataLoader.js';
import { initializeGame } from './gameInitializer.js';
import { startGame, startRandomEventLoop } from './gameLogic.js';

// Start loading game data and initialize the game
loadGameData().then(data => {
    initializeGame(data);
    startGame(data.gameWorld);
    startRandomEventLoop();
}).catch(error => {
    console.error('Failed to start the game:', error);
});
