document.addEventListener('DOMContentLoaded', () => {
    const worldWindow = document.getElementById('world-window');
    const commandInput = document.getElementById('command-input');
    const sendCommandButton = document.getElementById('send-command');
    const inventoryButton = document.getElementById('inventory-button');

    function logToWorld(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        worldWindow.appendChild(messageElement);
        worldWindow.scrollTop = worldWindow.scrollHeight;
    }

    function handleCommand(command) {
        logToWorld(`You entered: ${command}`);
        // Add game logic here
    }

    sendCommandButton.addEventListener('click', () => {
        const command = commandInput.value;
        commandInput.value = '';
        handleCommand(command);
   
