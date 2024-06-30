document.addEventListener('DOMContentLoaded', () => {
    const inventoryButton = document.getElementById('inventory-button');
    const inventoryContainer = document.getElementById('inventory-container');

    inventoryButton.addEventListener('click', () => {
        fetch('components/inventory.html')
            .then(response => response.text())
            .then(data => {
                inventoryContainer.innerHTML = data;
                inventoryContainer.style.display = 'block';
            })
            .catch(error => {
                console.error('Error loading inventory window:', error);
            });
    });

    // Close the inventory when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === inventoryContainer) {
            inventoryContainer.style.display = 'none';
        }
    });
});
