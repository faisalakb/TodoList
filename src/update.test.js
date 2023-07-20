import display from '../modules/display.js';

function setupLocalStorage(itemData) {
  localStorage.setItem('todoListItems', JSON.stringify(itemData));
}

function createItem(index, description, completed) {
  return { index, description, completed };
}

// Test for updating an item's 'completed' status
test('Update item completion status', () => {
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

    // Simulate toggling the checkbox of the first item
    const firstItemCheckbox = document.querySelector('input[type="checkbox"]');
    firstItemCheckbox.dispatchEvent(new MouseEvent('click'));

    // Check if the item in the DOM has been updated with the 'completed' class
    const firstItem = document.querySelector('li[data-index="1"]');
    expect(firstItem.classList.contains('completed')).toBe(true);

    // Retrieve the updated item data from localStorage
    const updatedItemData = JSON.parse(localStorage.getItem('todoListItems'));

    // Check if the item data in localStorage has been updated with the 'completed' status
    expect(updatedItemData[0].completed).toBe(true);

    // Clean up
    document.body.removeChild(listContainer);
  });
});
