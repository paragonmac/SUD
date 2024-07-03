export function logToWorld(message) {
    const worldWindow = document.getElementById('world-window');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    worldWindow.appendChild(messageElement);
    worldWindow.scrollTop = worldWindow.scrollHeight;  // Auto-scroll to bottom
    console.log('Logged to world window:', message);
}

// Function to log messages to the room window
export function logToRoom(message) {
    const roomWindow = document.getElementById('room-window');
    roomWindow.innerHTML += `<div>${message}</div>`;
    console.log('Logged to room window:', message);
}

// Function to update the room window
export function updateRoomWindow(room) {
    const roomWindow = document.getElementById('room-window');
    roomWindow.innerHTML = `
        <h3>${room.name}</h3>
        <p>${room.detailed_description || ''}</p>
        <p><strong>Items:</strong> ${room.items.map(item => item.name).join(', ')}</p>
        <p><strong>Monsters:</strong> ${room.monsters.map(monster => monster.name).join(', ')}</p>
        <p><strong>Exits:</strong> ${Object.keys(room.exits).join(', ')}</p>
    `;
    console.log('Updated room window:', room);
}

// Function to display the current room
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

    if (currentRoom.items.length > 0) {
        logToWorld('Items in the room:');
        currentRoom.items.forEach(item => {
            logToWorld(`- ${item.name}: ${item.description}`);
        });
    }
    if (currentRoom.livingThings.length > 0) {
        logToWorld('Living things in the room:');
        currentRoom.livingThings.forEach(thing => {
            logToWorld(`- ${thing.name}: ${thing.description}`);
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

    console.log('Displayed current room:', currentRoom);
}
