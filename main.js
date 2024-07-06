import { loadGameData } from './gameDataLoader.js';
import { initializeGame } from './gameInitializer.js';
import { startGame } from './gameLogic.js';
import * as eventManager from './eventManager.js';

// Start loading game data and initialize the game
loadGameData().then(data => {
    initializeGame(data);
    startGame(data.gameWorld);
    eventManager.eventLoop();
}).catch(error => {
    console.error('Failed to start the game:', error);
});
