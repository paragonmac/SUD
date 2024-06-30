document.addEventListener('DOMContentLoaded', () => {
    const worldWindow = document.getElementById('world-window');
    const commandInput = document.getElementById('command-input');
    const sendCommandButton = document.getElementById('send-command');
    const inventoryButton = document.getElementById('inventory-button');
    const inventoryContainer = document.getElementById('inventory-container');

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
    });

    commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendCommandButton.click();
        }
    });

    inventoryButton.addEventListener('click', () => {
        fetch('components/inventory.html')
            .then(response => response.text())
            .then(data => {
                inventoryContainer.innerHTML = data;
                inventoryContainer.style.display = 'block';
            })
            .catch(error => {
                logToWorld('Failed to load inventory window.');
                console.error('Error loading inventory window:', error);
            });
    });

    // Close the inventory when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === inventoryContainer) {
            inventoryContainer.style.display = 'none';
        }
    });
});
