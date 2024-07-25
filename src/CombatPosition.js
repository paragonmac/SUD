import { Combatant } from './Combatant.js';
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

    addCombatant(who) {
        for(let position in this.positions) {
            if (this.positions[position] === null) {
                this.positions[position] = who;
                return
            }
        }
        console.log('No available positions in combat');
    }

    removeCombatant(who) {
        for(let position in this.positions) {
            if (this.positions[position] === who) {
                this.positions[position] = null;
                return;
            }
        }
        console.log(`${who} not found`);
    }

    getCombatant(position) {
        return this.positions[position];
    }
}
