import { logToWorld } from './drawWindows.js';
import { player } from './Player.js';
import gameWorld from './gameWorld.yaml'; // Load the game world data

// Command handler functions
export function move(direction) {
    const currentRoom = window.gameWorld.rooms[player.currentRoom]; // Assuming the player starts in the first room
    if(currentRoom.exits[direction]) {
        player.move(currentRoom);
    }
    logToWorld(`You move ${direction}.`);
    // Add logic to update the player's position and room state
}

export function openInventory() {
    logToWorld('Opening inventory...');
    window.open('/components/inventory.html', 'Inventory', 'width=600,height=400');
}

export function displayCurrentRoom(player) {
    const currentRoom = window.gameWorld.rooms[player.currentRoom]; // Assuming the player starts in the first room
    logToWorld(currentRoom.detailed_description);
}

export function help() {
    logToWorld('Available commands: move <direction>, open inventory, help');
}

// Add more command handler functions as needed
