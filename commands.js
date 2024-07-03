import { logToWorld } from './drawWindows.js';
import { player } from './gameLogic.js';
import { updateRoomWindow } from './drawWindows.js';
//import gameWorld from './gameWorld.yaml'; // Load the game world data

// Command handler functions
export function move(direction) {
    const currentRoom = player.currentRoom; 
    const nsew = currentRoom.exits[direction];
    const exit = nsew.gotoRoom; //this needs a global variable to feed the gotoroom... we already have that data at this point
    if(exit) { // Check if the player can move in the specified direction
        player.move(exit);
        logToWorld(`You move ${direction}.`);
        updateRoomWindow(player.currentRoom);
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
    const currentRoom = player.currentRoom; 
    logToWorld(currentRoom.detailed_description);
}

export function help() {
    logToWorld('Available commands: move <direction>, open inventory, help');
}

// Add more command handler functions as needed
