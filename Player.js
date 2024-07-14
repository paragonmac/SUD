import { assert } from './utils.js';
import { Room } from './Room.js';
import { updateCompass } from './imageHandler.js';
import { logToWorld } from './drawWindows.js';
export class Player {
    constructor(name, startingRoom) {
        this.class = '';
        this.name = name;
        this.currentRoom = startingRoom;
        this.Roundtime = 0;
        this.leftHand = 'short_sword';
        this.rightHand = '';
        this.Container = {};
        this.health = 100;
        this.level = 1;
        this.spells = {};
        this.skills = {};
        this.isStunned = false;
        this.isBound = false;
        this.position = 3;
        this.engagement = 0;
        this.isAlive = true;
    }

    move(direction, rooms, gameWorld) {
        const currentRoom = rooms[this.currentRoom.id];
        assert(currentRoom, `Current room: ${this.currentRoom} not found ${rooms}`);
        const nextRoomId = currentRoom.getExit(direction);
        assert(typeof nextRoomId === 'number', `Invalid roomID ${nextRoomId}`);
        if (nextRoomId) {
            if (!rooms[nextRoomId]) {
                rooms[nextRoomId] = new Room(nextRoomId, gameWorld);
            }
            this.currentRoom = rooms[nextRoomId];
            this.currentRoom.enter(gameWorld);
            updateCompass(this.currentRoom);
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
        console.log(`Roundtime: ${this.Roundtime}`);
        console.log(`Health: ${this.health}`);
        console.log(`Level: ${this.level}`);
        console.log(`Current Room: ${this.currentRoom.id}`);
        console.log(`Inventory: ${this.inventory.map(item => item.name).join(', ')}`);
    }

    roundtimeSub(){
        if(this.Roundtime > 0) {
            assert(this.Roundtime > 0, 'Roundtime cannot be negative');
            this.Roundtime = Math.max(this.Roundtime - 1, 0);
        }
    }

    roundtimeAdd(adjust) {
        this.Roundtime += adjust;
        logToWorld(`Roundtime: ${this.Roundtime}`);
    }

    equipItem(item) {
        if (this.rightHand) {
            this.leftHand = item;
        } else {
            this.rightHand = item;
        }
    }

    increaseEngagement(amount) {
        this.engagement = Math.min(this.engagement + amount, 1000);
        this.checkEngagementStatus();
    }

    decreaseEngagement(amount) {
        this.engagement = Math.max(this.engagement - amount, 0);
        this.checkEngagementStatus();
    }

    checkEngagementStatus() {
        if(this.engagement >= 1000) {
            
        }
    }

    swap() {
        if (this.leftHand || this.rightHand) {
            const temp = this.rightHand;
            this.rightHand = this.leftHand;
            this.leftHand = temp;
            logToWorld(`Swapped items: ${this.leftHand} and ${this.rightHand}`);
        }
    }
}
