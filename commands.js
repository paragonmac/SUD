import { assert } from './utils.js';
import { logToWorld } from './drawWindows.js';
import { player, rooms } from './gameLogic.js';
import { updateRoomWindow, displayCurrentRoom } from './drawWindows.js';
import { updateCompass} from './imageHandler.js';

export function move(direction) {
    const currentRoom = player.currentRoom;
    assert(currentRoom, 'Player is not in any room');
    const exit = currentRoom.exits[direction];
    if (exit) {
        player.move(direction, rooms, window.gameWorld);
        logToWorld(`You move ${direction}.`);
        updateRoomWindow(player.currentRoom);
        displayCurrentRoom(player);
        updateCompass(player.currentRoom);
        
    } else {
        logToWorld(`You can't go ${direction}.`);
    }
}

export function openInventory() {
    logToWorld('Opening inventory...');
    window.open('/components/inventory.html', 'Inventory', 'width=600,height=400');
}

export function fetchCurrentRoom() {
    const currentRoom = player.currentRoom;
    assert(currentRoom, 'Player is not in any room');
    logToWorld(currentRoom.detailed_description);
}

export function help() {
    logToWorld('Available commands: move <direction>, open inventory, help');
}

export function playerDebug() {
    player.displayStatus();
}

export function jump() {
    logToWorld('You jump!');    
}

export function roundTimeCheck(action, time) {
    if(player.Roundtime === 0) {
        //take the action that is being requested and see if player is in roundtime, if not, do the action else take the actions roundtime
        player.roundtimeAdd(time);
        action();
    } else {
        logToWorld('Roundtime remaining: ' + player.Roundtime);
    }
}