import { assert } from './utils.js';
import { logToWorld, updateRoomWindow } from './drawWindows.js';
import { player, rooms, startGame } from './gameLogic.js';
import { roundTimeCheck } from './commands.js';
import { Monster } from './Monster.js';

export function eventLoop() {
    setInterval(() => {
        ambientEventLoop();
        player.roundtimeSub();
        roundTimeBarUpdate();
        monsterSpawn();
        updateRoomWindow();
    }, 1000);
    console.log('Event loop started');
}

export function ambientEventLoop() {
        if (Math.random() < 0.003) {
            const currentRoom = player.currentRoom;
            assert(currentRoom, 'Player is not in any room');
            if (currentRoom.events && currentRoom.events.length > 0) {
                const randomIndex = Math.floor(Math.random() * currentRoom.events.length);
                const randomEvent = currentRoom.events[randomIndex];
                logToWorld(randomEvent.message);
                console.log('Triggered random event:', randomEvent);
            }
        }
};

export function roundTimeBarUpdate(){
    if(roundTimeProgress && roundTimeText){
        const widthPercentage = Math.max(player.Roundtime / 10) * 100;
        roundTimeProgress.style.width = `${widthPercentage}%`;

        roundTimeText.textContent = player.Roundtime > 0 ? player.Roundtime : '';

        leftHandText.textContent = player.leftHand;
        rightHandText.textContent = player.rightHand;
    }
}

export function monsterSpawn() {
    if(player.currentRoom.monsters.length < 5){
        const monsterList = { //each zone will have a list like this of available monsters to randomly spawn
            'goblin': 1,
            'goblin_warrior': 2,
            'goblin_shaman': 3,
            'goblin_archer': 4,
            'goblin_chieftain': 5,
        };
        const randomMonster = Object.keys(monsterList)[Math.floor(Math.random() * Object.keys(monsterList).length)];
        const newMonster = new Monster(player.currentRoom, randomMonster);
        player.currentRoom.monsters.push(newMonster);
        logToWorld(`A ${newMonster.name} has appeared!`);
        return newMonster;
    }
}