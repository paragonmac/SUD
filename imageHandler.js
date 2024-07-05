import { assert } from './utils.js';

export function updateCompass(currentRoom) {
    assert(currentRoom, 'Current room is not defined');
    assert(currentRoom.exits, 'Current room exits are not defined');

    const directions = ['northwest', 'north', 'northeast', 'west', 'center', 'east', 'southwest', 'south', 'southeast'];
    const images = {
        northwest: 'compass_black.jpg',
        north: 'compass_black.jpg',
        northeast: 'compass_black.jpg',
        west: 'compass_black.jpg',
        center: 'compass_black.jpg',
        east: 'compass_black.jpg',
        southwest: 'compass_black.jpg',
        south: 'compass_black.jpg',
        southeast: 'compass_black.jpg'
    };

    // Update images based on available paths
    Object.keys(currentRoom.exits).forEach(path => {
        assert(images.hasOwnProperty(path), `Invalid direction: ${path}`);
        images[path] = `${path}.jpg`; // Assuming you have images like 'north.jpg'
    });

    // Set the background images for each direction
    directions.forEach(direction => {
        const element = document.getElementById(direction);
        assert(element, `Element for direction ${direction} not found`);
        element.style.backgroundImage = `url('assets/art/${images[direction]}')`;
    });
}
