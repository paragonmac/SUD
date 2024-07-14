import { assert } from './utils.js';
import { player } from './gameLogic.js';
import { rooms } from './gameLogic.js';

//options
let globalColor = 'white';
let globalBackgroundColor = '#131313';

export function breaker() {
    const worldWindow = document.getElementById('world-window');
    const messageElement = document.createElement('br');
    worldWindow.appendChild(messageElement);
}
export function logToWorld(message, options={}) { // format: {backgroundColor, color, bold, italic}
    const worldWindow = document.getElementById('world-window');
    assert(worldWindow, 'World window not found');
    const messageElement = document.createElement('div');
    messageElement.style.backgroundColor = options.backgroundColor || globalBackgroundColor;
    messageElement.style.color = options.color || globalColor;
    messageElement.style.fontWeight = options.bold ? 'bold' : 'normal';
    messageElement.style.fontStyle = options.italic ? 'italic' : 'normal';
    messageElement.textContent = message;
    worldWindow.appendChild(messageElement);
    worldWindow.scrollTop = worldWindow.scrollHeight;
    console.log('Logged to world window:', message);
}
export function logToRoom(message) {
    const roomWindow = document.getElementById('room-window');
    assert(roomWindow, 'Room window not found');
    roomWindow.innerHTML += `<div>${message}</div>`;
    console.log('Logged to room window:', message);
}

export function updateRoomWindow() {
    const roomWindow = document.getElementById('room-window');
    assert(roomWindow, 'Room window not found');
    const room = player.currentRoom;
    roomWindow.innerHTML = `
        <h3>[${room.name}]</h3>
        ${room.detailed_description || ''}
        <br>
            <strong>You also see: </strong>
            <span style="color: yellow">${room.items.map(item => item.name).join(', ')}</span>
        <br>
            <strong>Monsters:</strong>
            <span style="color: red">${room.monsters.length > 0 ? room.monsters.map(monster => monster.name).join(', '): ''}</span>
        <br>
            <strong>Exits:</strong> ${Object.keys(room.exits).join(', ')}
        <br>

    `;
    console.log('Updated room window:', room);
}

export function displayCurrentRoom(player) {
    const currentRoom = player.currentRoom;
    updateRoomWindow(currentRoom);
    breaker();
    logToWorld('[' + currentRoom.name + ']');
 
 
 
    if (currentRoom.monsters.length > 0) {
        let monsters = currentRoom.monsters.map(monster => monster.name).join(', ');
        if (currentRoom.detailed_description) {
            logToWorld(currentRoom.detailed_description + ' You also see a ' + monsters);
        }
    }
    if (currentRoom.exits) {
        logToWorld('Exits: ' + Object.keys(currentRoom.exits).join(', '), {color: '#00ff00'});
    } else {
        logToWorld('Exits: None', {color: '#ff0000'});
    }


    if (currentRoom.items || currentRoom.livingThings || currentRoom.hiddenThings) {
        if (currentRoom.livingThings) {
            let livingThings = currentRoom.livingThings.map(thing => thing.name).join(', ');
            //logToWorld('>You also see: ' + livingThings, {color: '#00ff00'});
        }
    }
    console.log('Displayed current room:', currentRoom);
}
