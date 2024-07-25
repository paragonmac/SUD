import { assert } from './utils.js';
import { logToWorld, updateRoomWindow } from './drawWindows.js';
import { player, rooms, startGame } from './gameLogic.js';
import { roundTimeCheck } from './commands.js';
import { Monster } from './Monster.js';

export function eventLoop() {
    setInterval(() => {
        ambientEventLoop();
        player.playerRoundtimeSub();
        roundTimeBarUpdate();
        monsterSpawn();
        updateRoomWindow();
        ambientMonsterLoop();
        playerEngagementBar();
    }, 1000);
    console.log('Event loop started')
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

export function ambientMonsterLoop() {
    if (Math.random() < 0.003) {
        const currentRoom = player.currentRoom
        assert(currentRoom, 'Player is not in any room')
        if (currentRoom.monsters && currentRoom.monsters.length > 0){
            const randomMonster = currentRoom.monsters[Math.floor(Math.random() * currentRoom.monsters.length)];
            if(randomMonster.randomMessages && randomMonster.randomMessages.length > 0){
                const randomMessage = randomMonster.randomMessages[Math.floor(Math.random() * randomMonster.randomMessages.length)];
                logToWorld(randomMessage);
            }
        }
    }
}

export function roundTimeBarUpdate(){
    if(roundTimeProgress && roundTimeText){
        const widthPercentage = Math.max(player.Roundtime / 10) * 100;
        roundTimeProgress.style.width = `${widthPercentage}%`;

        roundTimeText.textContent = player.Roundtime > 0 ? player.Roundtime : '';

        leftHandText.textContent = player.leftHand; //fix this
        rightHandText.textContent = player.rightHand; //fix this
    }
}
export function playerEngagementBar() {
    player.engagement = Math.floor(Math.random() * 1000, 0);
    const widthEngPercent = player.engagement / 1000;
    const color = getColor(widthEngPercent);
    engagementProgress.style.width = `${Math.min(widthEngPercent * 100, 100)}%`;
    engagementProgress.style.backgroundColor = color;
    engagementText.textContent = player.engagement;
}

function getColor(value) {
    const hue = ((1 - value) * 120).toString(10);
    return ["hsla(", hue, ",100%,40%,1)"].join("");
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