import { assert } from './utils.js';
import { Room } from './Room.js';
import  * as commands from './commands.js';
import { updateCompass } from './imageHandler.js';
import { logToWorld } from './drawWindows.js';
import { CombatPosition} from './CombatPosition.js';
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
        this.position = ['standing', 'kneeling', 'sitting', 'lying'];
        this.engagement = 0;
        this.isAlive = true;
        this.target = null;
        this.combatPosition = new CombatPosition();
    }

    playerMove(direction, rooms, gameWorld) {
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

    playerAddItem(item) {
        this.inventory.push(item);
        console.log(`${item.name} has been added to your inventory.`);
    }

    playerRemoveItem(itemName) {
        this.inventory = this.inventory.filter(item => item.name !== itemName);
        console.log(`${itemName} has been removed from your inventory.`);
    }

    playerDisplayStatus() {
        console.log(`Player: ${this.name}`);
        console.log(`Roundtime: ${this.Roundtime}`);
        console.log(`Health: ${this.health}`);
        console.log(`Level: ${this.level}`);
        console.log(`Current Room: ${this.currentRoom.id}`);
        //console.log(`Inventory: ${this.inventory.map(item => item.name).join(', ')}`);
        console.log(`Monster target: ${this.target ? this.target.name : 'None'}`)
        
    }

    playerRoundtimeSub(){
        if(this.Roundtime > 0) {
            assert(this.Roundtime > 0, 'Roundtime cannot be negative');
            this.Roundtime = Math.max(this.Roundtime - 1, 0);
        }
    }

    playerRoundtimeAdd(adjust) {
        this.Roundtime += adjust;
        logToWorld(`Roundtime: ${this.Roundtime}`);
    }

    playerEquipItem(item) {
        if (this.rightHand) {
            this.leftHand = item;
        } else {
            this.rightHand = item;
        }
    }

    playerIncreaseEngagement(amount) {
        this.engagement = Math.min(this.engagement + amount, 1000);
        //this.playerCheckEngagementStatus();
    }

    playerDecreaseEngagement(amount) {
        this.engagement = Math.max(this.engagement - amount, 0);
       //this.playerCheckEngagementStatus();
    }

    playerTargetMonster(monsterName) {
        const targetMonster = this.currentRoom.monsters.find(monster => monster.name.toLowerCase() === monsterName.toLowerCase());
        if (!targetMonster) {
            logToWorld(`No monster named ${monsterName}`);
            return;
        }
        this.target = targetMonster;
        logToWorld(`Engaging ${this.target.name}`);
    }

    playerEngage(arg1, arg2) {// aka advance
        const targetMonster = commands.findMonster(arg1, arg2);
        if (!targetMonster || !targetMonster.isAlive) {
            logToWorld(targetMonster ? 'Monster is already dead' : 'Please select a target');
            return;
        }

        for (let position in this.combatPosition) {
            if (this.combatPosition[position] === null) {
                this.combatPosition[position] = targetMonster;
                logToWorld(`You engage ${targetMonster.name} in ${position}`);
            }
        }
    }

    playerSwap() {
        if (this.leftHand || this.rightHand) {
            const temp = this.rightHand;
            this.rightHand = this.leftHand;
            this.leftHand = temp;
            logToWorld(`Swapped items: ${this.leftHand} and ${this.rightHand}`);
        }
    }
}

