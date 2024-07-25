import { Combatant } from './combatant.js';
export class CombatPosition {//combatLayout.drawio
    constructor() {
        this.positions = {
            top: null,
            topLeft: null,
            topRight: null,
            right: null,
            left: null,
            bottomRight: null,
            bottomLeft: null,
            bottom: null,
        };
    }

    addCombatant(position, id, type) {
        if (this.positions[position] === null) {
            this.positions[position] = new Combatant(id, type);
            return true;
        }
        return false;
    }

    removeCombatant(position) {
        if (this.positions[position] !== null) {
            const removed = this.positions[position];
            this.positions[position] = null;
            return removed;
        }
        return null;
    }

    getCombatant(position) {
        return this.positions[position];
    }
}
