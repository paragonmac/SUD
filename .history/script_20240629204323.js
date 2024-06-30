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
        // Add game logic here// Define a function to handle game logic
        function gameLoop() {
            // Add your game logic here
        
            // For example, you can check for game over conditions or update game state
        }
        
        // Define a function to start the game loop
        function startGame() {
            // Use setInterval to call the gameLoop function repeatedly at a specific interval (e.g., every 1000ms)
            const gameInterval = setInterval(() => {
                gameLoop();
                // Add any other game-related logic here
            }, 1000); // 1000ms = 1 second
        
            // Optionally, you can return the gameInterval if you want to stop the game loop later
            return gameInterval;
        }
        
        // Call the startGame function to begin the game loop
        startGame();
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

    inventoryButton.addEventListener('click', () => {// This function will open the inventory
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
