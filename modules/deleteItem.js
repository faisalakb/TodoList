import display from './display.js';

const del = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const txt = localStorage.getItem('todoListItems');
  const items = JSON.parse(txt);

  const updatedItems = [];
  let count = 1;
  for (let i = 0; i < checkboxes.length; i += 1) {
    if (!checkboxes[i].checked && items[i].completed === false) {
      items[i].index = count;
      updatedItems.push(items[i]);
      count += 1;
    }
  }

  localStorage.setItem('todoListItems', JSON.stringify(updatedItems));
  display();
};

export default del;