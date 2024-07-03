export class Player {
    constructor(name) {
        this.canMove = true;
        this.name = name;
        this.currentRoom = null; // Initialize currentRoom as null
        this.inventory = [];
        this.health = 100; // or any default value you prefer
        this.level = 1; // or any default value you prefer
    }

    move(roomId, rooms, gameWorld) {
        const currentRoom = rooms[this.currentRoom.id];
        const nextRoomId = currentRoom.getExit(roomId);
        if (nextRoomId && rooms[nextRoomId]) {
            this.currentRoom = rooms[nextRoomId];
            this.currentRoom.enter(gameWorld);
            console.log(`${this.name} moves to ${nextRoomId}`);
        } else {
            console.log(`You can't move to ${roomId} from here.`);
        }
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
}
