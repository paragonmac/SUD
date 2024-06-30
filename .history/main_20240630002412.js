import { loadGameData } from './gameDataLoader.js';
import { initializeGame } from './gameInitializer.js';
import { startGame, startRandomEventLoop } from './gameLogic.js';

// Start loading game data and initialize the game
loadGameData().then(data => {
    initializeGame(data);
    startGame();

    // Start regular events and delayed events
    startRandomEventLoop();
}).catch(error => {
    console.error('Failed to start the game:', error);
});
