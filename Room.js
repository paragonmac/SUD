import { assert } from './utils.js';

export class Room {
    constructor(id) {
        this.id = id;
        this.name = '';
        this.description = '';
        this.detailed_description = '';
        this.exits = {};
        this.items = [];
        this.monsters = [];
        this.livingThings = [];
        this.hiddenThings = [];
        this.events = [];
        this.initialized = false;
    }

    initialize() {
        const roomData = gameWorld.rooms.find(room => room.id === this.id);
        assert(roomData, `Room data for room with id ${this.id} not found roomData: ${roomData}`);
        this.name = roomData.name;
        this.description = roomData.description;
        this.detailed_description = roomData.detailed_description || '';
        this.exits = roomData.exits || {};
        this.items = roomData.items || [];
        this.monsters = roomData.monsters || [];
        this.livingThings = roomData.livingThings || [];
        this.hiddenThings = roomData.hiddenThings || [];
        this.events = roomData.events || [];
        this.initialized = true;
        console.log(`Room ${this.id} initialized`);
    }

    enter() {
        if (!this.initialized) {
            this.initialize();
        }
        console.log(`Entered room: ${this.name}`);
    }

    getExit(direction) {
        const exit = this.exits[direction];
        return exit ? exit.gotoRoom: null;
    }
}
