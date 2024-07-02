export class Player {
    constructor(name) {
        this.can
        this.name = name;
        this.currentRoom = 2;
        this.inventory = [];
        this.health = 100; // or any default value you prefer
        this.level = 1; // or any default value you prefer
        // Add more properties as needed
    }

    move(direction) {
        // Add logic to move the player to a new room based on direction
        console.log(`${this.name} moves ${direction}`);
    }

    addItem(item) {
        this.inventory.push(item);
        console.log(`${item.name} has been added to your inventory.`);
    }

    removeItem(itemName) {
        this.inventory = this.inventory.filter(item => item.name !== itemName);
        console.log(`${itemName} has been removed from your inventory.`);
    }

    displayStatus() {
        console.log(`Player: ${this.name}`);
        console.log(`Health: ${this.health}`);
        console.log(`Level: ${this.level}`);
        console.log(`Current Room: ${this.currentRoom}`);
        console.log(`Inventory: ${this.inventory.map(item => item.name).join(', ')}`);
    }

    // Add more methods as needed
}
