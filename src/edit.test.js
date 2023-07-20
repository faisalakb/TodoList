import display from '../modules/display.js';

function setupLocalStorage(itemData) {
  localStorage.setItem('todoListItems', JSON.stringify(itemData));
}

function createItem(index, description, completed) {
  return { index, description, completed };
}

// Test for editing an item
test('Edit item from the list', () => {
  // Set up initial test data
  window.addEventListener('DOMContentLoaded', () => {
    const initialItemData = [
      createItem(1, 'Item 1', false),
      createItem(2, 'Item 2', false),
    ];
    setupLocalStorage(initialItemData);

    // Create a container element for the list items
    const listContainer = document.createElement('div');
    listContainer.id = 'ulId';
    document.body.appendChild(listContainer);

    // Call the display function to render the initial items
    display();

    // Simulate a click on the first item to edit it
    const firstItem = document.querySelector('li[data-index="1"]');
    firstItem.dispatchEvent(new MouseEvent('click'));

    // Get the input field and change its value
    const inputField = document.querySelector('input[type="text"]');
    inputField.value = 'Edited Item 1';

    // Simulate pressing the Enter key to save the edited item
    const enterKeyEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    inputField.dispatchEvent(enterKeyEvent);

    // Check if the item in the DOM has been updated
    expect(firstItem.textContent).toBe('Edited Item 1');

    // Retrieve the updated item data from localStorage
    const updatedItemData = JSON.parse(localStorage.getItem('todoListItems'));

    // Check if the item data in localStorage has been updated
    expect(updatedItemData[0].description).toBe('Edited Item 1');
    expect(updatedItemData[0].completed).toBe(false); // Item completion state remains unchanged

    // Clean up
    document.body.removeChild(listContainer);
  });
});
