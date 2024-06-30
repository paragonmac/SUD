document.addEventListener('DOMContentLoaded', () => {
    const worldWindow = document.getElementById('world-window');
    const commandInput = document.getElementById('command-input');
    const sendCommandButton = document.getElementById('send-command');
    const inventoryButton = document.getElementById('inventory-button');
    
    // Define possible events
       
    onst events = [
        { type: 'enemy', message: 'A goblin appears!', action: spawnEnemy },
        { type: 'treasure', message: 'You found a treasure chest!', action: findTreasure },
        { type: 'trap', message: 'A trap is triggered!', action: triggerTrap },
        { type: 'npc', message: 'An NPC wants to talk to you.', action: encounterNPC }
   ];

    function logToWorld(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        worldWindow.appendChild(messageElement);
        worldWindow.scrollTop = worldWindow.scrollHeight;  // Auto-scroll to bottom
    }

    function handleCommand(command) {
        logToWorld(`You entered: ${command}`);
        // Add game logic here
    }

    // Event actions
    function spawnEnemy() {
        logToWorld('Prepare for battle!');
    }

    function findTreasure() {
        logToWorld('You open the chest and find gold coins!');
    }

    function triggerTrap() {
        logToWorld('Ouch! You stepped on a trap and took damage.');
    }

    function encounterNPC() {
        logToWorld('The NPC gives you a quest.');
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
        spawnEvent();
    }, 1000);
});