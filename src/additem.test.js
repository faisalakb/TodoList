import addItem from '../modules/addItem.js';

describe('addItem function', () => {
  // Mock localStorage
  let localStorageMock = {};
  beforeEach(() => {
    localStorageMock = {};
    global.localStorage = {
      getItem: (key) => localStorageMock[key],
      setItem: (key, value) => (localStorageMock[key] = value),
    };
  });

  window.addEventListener('DOMContentLoaded', () => {
    test('should add a new item to the todoList', () => {
      localStorageMock.todoListItems = '[]';

      // Create a mock input element
      const inputElementMock = document.createElement('input');
      inputElementMock.id = 'inpId';
      document.body.appendChild(inputElementMock);

      addItem(inputElementMock);

      // Simulate the input value and Enter key event
      inputElementMock.value = 'New task';
      const event = new KeyboardEvent('keyup', { key: 'Enter' });
      inputElementMock.dispatchEvent(event);

      const expectedTodoList = [{ index: 1, description: 'New task', completed: false }];
      expect(JSON.parse(localStorageMock.todoListItems)).toEqual(expectedTodoList);
    });
  });

  test('should not add an empty item to the todoList', () => {
    localStorageMock.todoListItems = '[]';

    // Create a mock input element
    const inputElementMock = document.createElement('input');
    inputElementMock.id = 'inpId';
    document.body.appendChild(inputElementMock);

    // Call the addItem function with the mock input element
    addItem(inputElementMock);

    // Simulate the Enter key event without a value
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElementMock.dispatchEvent(event);

    // Check if the localStorage remains unchanged
    expect(localStorageMock.todoListItems).toBe('[]');
  });
});
