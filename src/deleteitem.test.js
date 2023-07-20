import display from '../modules/display.js';

// Mock the list container
document.body.innerHTML = `
  <div id="ulId"></div>
`;
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Ensure the correct item is deleted from the todo list', () => {
  it('should delete the correct item when the delete icon is clicked', () => {
    // Arrange
    window.addEventListener('DOMContentLoaded', () => {
      const itemData = [
        { index: 1, description: 'Item 1', completed: false },
        { index: 2, description: 'Item 2', completed: false },
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(itemData));

      // Set up the initial todo list display
      display();

      // Act
      const deleteIcons = document.querySelectorAll('.delete-icon');
      expect(deleteIcons.length).toBe(2);

      deleteIcons[1].click();

      // Assert
      const updatedItemData = [
        { index: 1, description: 'Item 1', completed: false },
      ];
      expect(localStorageMock.setItem).toHaveBeenCalledWith('todoListItems', JSON.stringify(updatedItemData));

      // Ensure the correct item (second item) has been removed from the list
      const remainingListItems = document.querySelectorAll('li');
      expect(remainingListItems[1].textContent).toBe('Item 1');
    });
  });
});

describe('Clear all completed items from the todo list', () => {
  it('should remove all completed items when the "clear all completed" button is clicked', () => {
    window.addEventListener('DOMContentLoaded', () => {
      // Arrange
      const itemData = [
        { index: 1, description: 'Item 1', completed: true },
        { index: 2, description: 'Item 2', completed: false },
        { index: 3, description: 'Item 3', completed: true },
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(itemData));

      display();

      // Act
      const clearButton = document.getElementById('clsBtn');
      expect(clearButton).toBeTruthy();

      clearButton.click();

      // Assert
      const updatedItemData = [
        { index: 2, description: 'Item 2', completed: false },
      ];
      expect(localStorageMock.setItem).toHaveBeenCalledWith('todoListItems', JSON.stringify(updatedItemData));
      const remainingListItems = document.querySelectorAll('li');
      expect(remainingListItems.length).toBe(1);
    });
  });
});
