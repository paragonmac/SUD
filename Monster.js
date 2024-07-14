import { assert } from './utils.js';
import { Room } from './Room.js';
import { gameData } from './main.js';
import { player } from './gameLogic.js';

export class Monster {
    constructor(room, name) {
        const monsterData = gameData.monsters.find(monster => monster.id === name);
        assert(monsterData, `Monster data for monster with id ${this.id} not found monsterData: ${monsterData}`);
        this.name = monsterData.name;
        this.description = monsterData.description;
        this.health = monsterData.health || 100;
        this.attackPower = monsterData.attackPower;
        this.currentRoom = room;
        this.Roundtime = monsterData.Roundtime || 0;
        this.leftHand = monsterData.leftHand || 'stiletto';
        this.rightHand = monsterData.rightHand || '';
        this.backContainer = monsterData.backContainer || null;
        this.level = monsterData.level || 1;
        this.spells = monsterData.spells || [];
        this.isStunned = monsterData.isStunned || false;
        this.isBound = monsterData.isBound || false;
        this.position = monsterData.position || 'standing';

    }

    //TODO: implement monster move
    monsterMove(direction, rooms, gameWorld) {
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
            updateCompass(this.currentRoom);
            console.log(`${this.name} moves ${direction} to ${nextRoomId}`);
        } else {
            console.log(`You can't move ${direction} from here.`);
        }
    }


    monsterAttack(target) {
        assert(target, 'Target is not defined');
        if (target.health <= 0) {
            console.log(`${target.name} is already dead.`);
            return;
        }
        target.health -= this.attackPower;
        console.log(`${this.name} attacks ${target.name} for ${this.attackPower} damage.`);
        if (target.health <= 0) {
            console.log(`${target.name} has been killed by ${this.name}.`);
        }
    }

    monsterTakeDamage(damage) {
        assert(damage >= 0, 'Damage must be a non-negative value');
        this.health -= damage;
        console.log(`${this.name} takes ${damage} damage.`);
        if (this.health <= 0) {
            console.log(`${this.name} has been killed.`);
        }
    }

    monsterEngage(target) {
        if(player.isAlive()) {
            
        }
    }


    monsterAdd(){

    }

    monsterBrain() {
        console.log(`${this.name} is thinking.`);
    }
    isAlive() {
        return this.health > 0;
    }

}
