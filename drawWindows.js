import { assert } from './utils.js';

export function logToWorld(message) {
    const worldWindow = document.getElementById('world-window');
    assert(worldWindow, 'World window not found');
    const messageElement = document.createElement('div');
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
        <h3>${room.name}</h3>
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
    logToWorld(currentRoom.description);
    if (currentRoom.detailed_description) {
        logToWorld(currentRoom.detailed_description);
    }
    if (currentRoom.exits) {
        logToWorld('Exits: ' + Object.keys(currentRoom.exits).join(', '));
    } else {
        logToWorld('Exits: None');
    }

    if(currentRoom.items.length > 0 || currentRoom.livingThings.length > 0 || currentRoom.hiddenThings.length > 0) {
        logToWorld('\nYou also see:');
        if (currentRoom.livingThings.length > 0) {
            currentRoom.livingThings.forEach(thing => {
                logToWorld(`${thing.name},`);
            });
        }
        if (currentRoom.hiddenThings.length > 0) {
            logToWorld('Hidden things in the room:');
            currentRoom.hiddenThings.forEach(hidden => {
                logToWorld(`- ${hidden.name}: ${hidden.description}`);
            });
        }
        if (currentRoom.monsters.length > 0) {
            logToWorld('Monsters in the room:');
            currentRoom.monsters.forEach(monster => {
                logToWorld(`- ${monster.name}: ${monster.description}`);
            });
        }
    }
    console.log('Displayed current room:', currentRoom);
}
