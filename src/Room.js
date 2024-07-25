import { assert } from './utils.js';

export class Room {
    constructor(id, gameWorld) {
        this.id = id;
        const roomData = gameWorld.rooms.find(room => room.id === this.id);
        assert(roomData, `Room data for room with id ${this.id} not found roomData: ${roomData}`);
        
        this.name = roomData.name;
        this.description = roomData.description;
        this.detailed_description = roomData.detailed_description || '';
        this.exits = roomData.exits || [];
        this.items = roomData.items || [];
        this.monsters = [];
        this.livingThings = roomData.livingThings || [];
        this.hiddenThings = roomData.hiddenThings || [];
        this.events = roomData.events || [];
        this.initialized = true;
        this.areaType = roomData.areaType || '';
        this.zoneName = roomData.zoneName || '';

        console.log(`Room ${this.id} initialized`);
    }

    enter() {
        if (!this.initialized) {
            console.log(`Room ${this.id} not properly initialized`);
            return;
        }
        console.log(`Entered room: ${this.name}`);
    }

    getExit(direction) {
        const exit = this.exits[direction];
        return exit ? exit.gotoRoom : null;
    }
}
