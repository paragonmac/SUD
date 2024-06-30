document.addEventListener('DOMContentLoaded', () => {
    const worldWindow = document.getElementById('world-window');
    const commandInput = document.getElementById('command-input');
    const sendCommandButton = document.getElementById('send-command');
    const inventoryButton = document.getElementById('inventory-button');
    
    // Define possible events
       
    const events = [
        { message: 'A gentle breeze passes through the area.' },
        { message: 'You hear distant, eerie sounds.' },
        { message: 'A strange, unpleasant smell wafts through the air.' },
        { message: 'The temperature suddenly drops, and you shiver.' },
        { message: 'You notice movement in the shadows.' },
        { message: 'A bird sings a melancholic tune nearby.' },
        { message: 'Leaves rustle as a small animal scurries by.' },
        { message: 'The sky darkens momentarily, then brightens again.' },
        { message: 'A distant roar echoes through the landscape.' },
        { message: 'You feel a slight tremor under your feet.' }
    ];  

    function logToWorld(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        worldWindow.appendChild(messageElement);
        worldWindow.scrollTop = worldWindow.scrollHeight;  // Auto-scroll to bottom
    }

    function handleCommand(command) {
        logToWorld(`You entered: ${command}`);
        // Add command logic here
    }

    // Spawn event function
    function spawnEvent() {//
        const eventIndex = Math.floor(Math.random() * events.length);
        const event = events[eventIndex];
        logToWorld(event.message);
        event.action();
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
        // Open inventory.html in a new window
        window.open('/components/inventory.html', 'Inventory', 'width=600,height=400');
    });

    // Game loop - 1 second tick
    setInterval(() => {
        // Critter Spawner
        // Ambient events
        // Player Updates
        // Critter Updates
        // Day/Night Cycle
        // Weather Updates
        // WorldEvents
        // Eventqueue(events )
        if(Math.random() < 0.01) { // 1% chance
            spawnEvent();
        }
    }, 1000);// 1 second 
});