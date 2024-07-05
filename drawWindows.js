import { assert } from './utils.js';
import { player } from './gameLogic.js';
import { rooms } from './gameLogic.js';

//options
let globalColor = 'white';
let globalBackgroundColor = '#131313';

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

export function updateRoomWindow(room) {
    const roomWindow = document.getElementById('room-window');
    assert(roomWindow, 'Room window not found');
    roomWindow.innerHTML = `
        <h3>[${room.name}]</h3>
        <p>${room.detailed_description || ''}</p>
        <p>
            <strong>You also see: </strong>
            <span style="color: yellow">${room.items.map(item => item.name).join(', ')}</span>
        </p>
        <p>
            <strong>Monsters:</strong>
            <span style="color: red">${room.monsters.map(monster => monster.name).join(', ')}</span>
        </p>
        <p>
            <strong>Exits:</strong> ${Object.keys(room.exits).join(', ')}
        </p>
    `;
    console.log('Updated room window:', room);
}

export function displayCurrentRoom(player) {
    const currentRoom = player.currentRoom;
    updateRoomWindow(currentRoom);
    logToWorld('[' + currentRoom.name + ']');
    logToWorld(currentRoom.description);
    if (currentRoom.detailed_description) {
        logToWorld(currentRoom.detailed_description);
    }
    if (currentRoom.exits) {
        logToWorld('Exits: ' + Object.keys(currentRoom.exits).join(', '));
    } else {
        logToWorld('Exits: None');
    }

    if (currentRoom.items || currentRoom.livingThings || currentRoom.hiddenThings) {
        logToWorld('\nYou also see: ');
        if (currentRoom.livingThings) {
            let livingThings = currentRoom.livingThings.map(thing => thing.name).join(', ');
            logToWorld(livingThings);
        }
    }
    console.log('Displayed current room:', currentRoom);
}
