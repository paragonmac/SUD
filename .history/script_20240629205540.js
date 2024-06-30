document.addEventListener('DOMContentLoaded', () => {
    const worldWindow = document.getElementById('world-window');
    const commandInput = document.getElementById('command-input');
    const sendCommandButton = document.getElementById('send-command');
    const inventoryButton = document.getElementById('inventory-button');
    const inventoryContainer = document.getElementById('inventory-container');

    function logToWorld(message) {// This function will log the message to the world window
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        worldWindow.appendChild(messageElement);
        worldWindow.scrollTop = worldWindow.scrollHeight;
    }

    function handleCommand(command) {// This function will handle the command
        logToWorld(`> ${command}`);
        // Add game logic here
    }

    sendCommandButton.addEventListener('click', () => {// This function will send the command
        const command = commandInput.value;
        commandInput.value = '';
        handleCommand(command);
    });

    commandInput.addEventListener('keypress', (e) => {// This function will send the command when enter is pressed
        if (e.key === 'Enter') {
            sendCommandButton.click();
        }
    });

    inventoryButton.addEventListener('click', () => {
        window.open('inventory.html', 'Inventory', 'width=600,height=400');
    });

    // Game loop - 1 second tick
    setInterval(() => {
        spawnEvent();
    }, 1000);
    
});
