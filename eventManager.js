import { assert } from './utils.js';
import { logToWorld } from './drawWindows.js';
import { player, rooms, startGame } from './gameLogic.js';
import { roundTimeCheck } from './commands.js';

export function eventLoop() {
    setInterval(() => {
        ambientEventLoop();
        player.roundtimeSub();
        roundTimeBarUpdate();
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
        const widthPercentage = (player.Roundtime / 10) * 100;
        roundTimeProgress.style.width = `${widthPercentage}%`;

        roundTimeText.textContent = player.Roundtime > 0 ? player.Roundtime : '';
    }
}