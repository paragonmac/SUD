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
        player.playerMove(direction, rooms, window.gameWorld);
        logToWorld(`>: You move ${direction}.`);
        updateRoomWindow(player.currentRoom);
        displayCurrentRoom(player);
        updateCompass(player.currentRoom);
        
    } else {
        logToWorld(`You can't go ${direction}.`);
    }
}

export function targetMonster(monster){
    player.playerTargetMonster(monster);
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

export function playerDisplayStatus() {
    player.playerDisplayStatus();
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

export function swap() {
    player.swap();
}

export function listMonsters() {
    console.log('List of monsters: ' + player.currentRoom.monsters.map(monster => monster.name).join(', '));
}

export function findMonster(arg1, arg2) { // green goblin
    let matchedMonsters = [];
    let phyDescriptionMatch = [];
    //if only arg2 is there then we need to treat it as arg1 else we need to treat it as arg2

    if(arg1 === null && arg2 === null) {
        logToWorld(`Please specify a monster to find.`);
        return
    }

    if(arg1 != null && arg2 === null) {
        matchedMonsters = player.currentRoom.monsters.filter(monster =>
        monster.name.startsWith(arg1.toLowerCase())
        );
    }

    if(arg1 != null && arg2 != null) {
        matchedMonsters = player.currentRoom.monsters.filter(monster =>
            monster.name.startsWith(arg2.toLowerCase()))
        if(matchedMonsters.length > 0) {
            phyDescriptionMatch = player.currentRoom.monsters.filter(monster => 
                monster.physicalDescription.startsWith(arg1.toLowerCase()))
        }
    }    

    if (phyDescriptionMatch.length === 1) {
        return phyDescriptionMatch[0];
    }else if (phyDescriptionMatch.length > 1) {
        logToWorld(`DEBUG More than one type of monster with that description, that should not have happened`);
    }else{   //there is no physcial description, just match the name 
        if (matchedMonsters.length === 1) {
        return matchedMonsters[0];
        } else if (matchedMonsters.length > 1) {
            logToWorld(`Ambiguous command. Did you mean: ${matchedMonsters.map(monster => `${monster.physicalDescription} ${monster.name}`).join(', ')}`);
        } else {
            logToWorld(`Couldn't find monster: ${arg1}.`);
        }
    }
}