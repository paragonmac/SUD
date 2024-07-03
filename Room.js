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

    initialize(gameWorld) {
        const roomData = gameWorld.rooms.find(room => room.id === this.id);
        if (roomData) {
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
        } else {
            console.error(`Room ${this.id} not found in game world`);
        }
    }

    enter(gameWorld) {
        if (!this.initialized) {
            this.initialize(gameWorld);
        }
        console.log(`Entered room: ${this.name}`);
    }

    getExit(direction) {
        return this.exits[direction];
    }
}
