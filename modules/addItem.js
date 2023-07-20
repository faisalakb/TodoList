import display from './display.js';

const addItem = () => {
  const inp = document.getElementById('inpId');

  inp.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      const txt = localStorage.getItem('todoListItems');
      const todoList = JSON.parse(txt) || [];

      if (inp.value === '') {
        console.log('Please enter a Todo');
      } else {
        todoList.push({ index: todoList.length + 1, description: inp.value, completed: false });
        inp.value = '';
        localStorage.setItem('todoListItems', JSON.stringify(todoList));
        display();
      }
    }
  });
  return 0;
};

export default addItem;