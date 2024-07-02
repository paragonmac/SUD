import { logToWorld } from './drawWindows.js';
import { player } from './gameLogic.js';
//import gameWorld from './gameWorld.yaml'; // Load the game world data

// Command handler functions
export function move(direction) {
    const currentRoom = window.gameWorld.rooms[player.currentRoom]; 
    const exit = currentRoom.exits.gotoRoom];
    if(exit) { // Check if the player can move in the specified direction
        player.move(exit.gotoRoom);
        logToWorld(`You move ${direction}.`);
        displayCurrentRoom(player);
    }
    else {
        logToWorld(`You can't go ${direction}.`);
    }
    // Add logic to update the player's position and room state
}

export function openInventory() {
    logToWorld('Opening inventory...');
    window.open('/components/inventory.html', 'Inventory', 'width=600,height=400');
}

export function displayCurrentRoom() {
    const currentRoom = window.gameWorld.rooms[player.currentRoom]; 
    logToWorld(currentRoom.detailed_description);
}

export function help() {
    logToWorld('Available commands: move <direction>, open inventory, help');
}

// Add more command handler functions as needed
