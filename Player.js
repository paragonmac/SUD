import { assert } from './utils.js';
import { Room } from './Room.js';
export class Player {
    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.inventory = [];
        this.health = 100;
        this.level = 1;
        this.handr = null;
        this.handl = null;
        this.backContainer = null;
    }

    move(direction, rooms, gameWorld) {
        const currentRoom = rooms[this.currentRoom.id];
        assert(currentRoom, `Current room: ${this.currentRoom} not found ${rooms}`);
        const nextRoomId = currentRoom.getExit(direction);
        assert(typeof nextRoomId === 'number', `Invalid roomID ${nextRoomId}`);
        if (nextRoomId) {
            if (!rooms[nextRoomId]) {
                rooms[nextRoomId] = new Room(nextRoomId);
                rooms[nextRoomId].initialize(gameWorld);
            }
            this.currentRoom = rooms[nextRoomId];
            this.currentRoom.enter(gameWorld);
            console.log(`${this.name} moves ${direction} to ${nextRoomId}`);
        } else {
            console.log(`You can't move ${direction} from here.`);
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
        console.log(`Current Room: ${this.currentRoom.id}`);
        console.log(`Inventory: ${this.inventory.map(item => item.name).join(', ')}`);
    }
}
