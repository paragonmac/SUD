export function logToWorld(message) {
    const worldWindow = document.getElementById('world-window');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    worldWindow.appendChild(messageElement);
    worldWindow.scrollTop = worldWindow.scrollHeight;  // Auto-scroll to bottom TODO add scrollToBottom checkbox and call this via if check. NEEDs to no be at bottom to activate
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
        <h3>${room.id}</h3>
        <p>${room.detailed_description || ''}
        <strong>Items near by:</strong> ${room.items.map(item => item.name).join(', ')}
        <p<strong>Monsters:</strong> ${room.monsters.map(monster => monster.name).join(', ')}
        <strong>Exits:</strong> ${room.exits.map(exit => exit.direction).join(', ')}</p>
    `;
    console.log('Updated room window:', room);
}

// Function to display the current room
export function displayCurrentRoom() {
    const currentRoom = window.gameWorld.rooms[0]; // Assuming the player starts in the first room
    updateRoomWindow(currentRoom);
    logToWorld(currentRoom.description);
    if (currentRoom.detailed_description) {
        logToWorld(currentRoom.detailed_description);
    }
    if (currentRoom.exits) {
        logToWorld('Exits:');
        currentRoom.exits.forEach(exit => {
            logToWorld(`- ${exit.direction}: ${exit.description}`);
        });
    }
    if (currentRoom.items.length > 0) {
        logToWorld('Items in the room:');
        currentRoom.items.forEach(item => {
            if (!item) {
                console.error(`Item not found in current room: ${currentRoom.id}`);
            } else {
                logToWorld(`- ${item.name}: ${item.description}`);
            }
        });
    }
    if (currentRoom.livingThings.length > 0) {
        logToWorld('Living things in the room:');
        currentRoom.livingThings.forEach(thing => {
            if (!thing) {
                console.error(`Living thing not found in current room: ${currentRoom.id}`);
            } else {
                logToWorld(`- ${thing.name}: ${thing.description}`);
            }
        });
    }
    if (currentRoom.hiddenThings.length > 0) {
        logToWorld('Hidden things in the room:');
        currentRoom.hiddenThings.forEach(hidden => {
            if (!hidden) {
                console.error(`Hidden thing not found in current room: ${currentRoom.id}`);
            } else {
                logToWorld(`- ${hidden.name}: ${hidden.description}`);
            }
        });
    }
    if (currentRoom.monsters.length > 0) {
        logToWorld('Monsters in the room:');
        currentRoom.monsters.forEach(monster => {
            if (!monster) {
                console.error(`Monster not found in current room: ${currentRoom.id}`);
            } else {
                logToWorld(`- ${monster.name}: ${monster.description}`);
            }
        });
    }

    console.log('Displayed current room:', currentRoom);
}
