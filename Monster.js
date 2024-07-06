import { assert } from './utils.js';

export class Monster {
    constructor(id, name, description, health, attackPower) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.health = health;
        this.attackPower = attackPower;
    }

    attack(target) {
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

    takeDamage(damage) {
        assert(damage >= 0, 'Damage must be a non-negative value');
        this.health -= damage;
        console.log(`${this.name} takes ${damage} damage.`);
        if (this.health <= 0) {
            console.log(`${this.name} has been killed.`);
        }
    }

    isAlive() {
        return this.health > 0;
    }

    displayStatus() {
        console.log(`Monster: ${this.name}`);
        console.log(`Description: ${this.description}`);
        console.log(`Health: ${this.health}`);
        console.log(`Attack Power: ${this.attackPower}`);
    }
}
