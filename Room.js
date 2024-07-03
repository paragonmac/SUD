import gameWorld from './data/gameWorld.yaml'; // Load the game world data

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
        if (roomData) {
            this.name = roomData.name;
            this.description = roomData.description;
            this.detailed_description = roomData.detailed_description || '';
            this.exits = roomData.exits;
            this.items = roomData.items || [];
            this.monsters = roomData.monsters || [];
            this.livingThings = roomData.livingThings || [];
            this.hiddenThings = roomData.hiddenThings || [];
            this.events = roomData.events || [];
            this.initialized = true;
            console.log(`Room ${this.id} initialized`);
        } else {
            console.error(`Room ${this.id} not found in game world`);
        }
    }

    enter() {
        if (!this.initialized) {
            this.initialize();
        }
        console.log(`Entered room: ${this.name}`);
    }

    // Add more methods as needed, like interacting with items or monsters
}
