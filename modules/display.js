const listContainer = document.getElementById('ulId');
const checkBox = document.createElement('input');
const div = document.createElement('div');
const refres = document.getElementById('refres');
div.innerHTML = '<span class="delete-icon hide"><i class="fa fa-trash delEd"></i></span>';
div.classList.add('test');
checkBox.type = 'checkbox';
checkBox.setAttribute('class', 'chbox');

const display = () => {
  listContainer.innerHTML = ''; // Clear the list container

  let itemData = [];
  if (localStorage.length !== 0) {
    const txt = localStorage.getItem('todoListItems');
    itemData = JSON.parse(txt);
  }

  itemData.forEach((element) => {
    const section = document.createElement('section');
    section.id = 'se';

    const liTag = document.createElement('li');
    const text = document.createTextNode(element.description);
    liTag.setAttribute('data-index', element.index);
    if (element.completed === true) {
      liTag.classList.add('completed');
    }
    liTag.appendChild(text);

    section.appendChild(checkBox.cloneNode(true));
    section.appendChild(liTag);
    section.appendChild(div.cloneNode(true));
    section.innerHTML += '<br><br>';

    listContainer.appendChild(section);

    liTag.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = element.description;
      input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          element.description = input.value;
          localStorage.setItem('todoListItems', JSON.stringify(itemData));
          display();
        }
      });

      liTag.textContent = '';
      liTag.appendChild(input);
      input.focus();
    });
  });

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const li = checkbox.closest('section').querySelector('li');
      let i = 0;
      if (checkbox.checked) {
        li.classList.add('completed');
        const liId = parseInt(li.getAttribute('data-index'), 10);
        while (i < itemData.length) {
          if (liId === itemData[i].index) {
            itemData[i].completed = true;
            localStorage.setItem('todoListItems', JSON.stringify(itemData));
          }
          i += 1;
        }
      } else {
        li.classList.remove('completed');
        const liId = parseInt(li.getAttribute('data-index'), 10);
        while (i < itemData.length) {
          if (liId === itemData[i].index) {
            itemData[i].completed = false;
            localStorage.setItem('todoListItems', JSON.stringify(itemData));
          }
          i += 1;
        }
      }
    });
  });

  const divIcon = document.querySelectorAll('.test');
  divIcon.forEach((div) => {
    div.addEventListener('click', (event) => {
      const liTag = event.target.parentElement.querySelector('li');
      const input = document.createElement('input');
      input.type = 'text';
      input.setAttribute('class', 'dynInp');
      input.value = liTag.textContent;
      input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          liTag.textContent = input.value;
          const index = parseInt(liTag.getAttribute('data-index'), 10);
          const itemToUpdate = itemData.find((element) => element.index === index);
          itemToUpdate.description = input.value;
          localStorage.setItem('todoListItems', JSON.stringify(itemData));
        }
      });
      liTag.textContent = '';
      liTag.appendChild(input);
      input.focus();
      const deleteIcon = div.querySelector('.delete-icon');
      deleteIcon.classList.remove('hide');
      deleteIcon.addEventListener('click', () => {
        const index = parseInt(liTag.getAttribute('data-index'), 10);
        const itemIndex = itemData.findIndex((element) => element.index === index);
        if (itemIndex !== -1) {
          itemData.splice(itemIndex, 1);
          for (let i = itemIndex; i < itemData.length; i += 1) {
            itemData[i].index = i + 1;
          }
          localStorage.setItem('todoListItems', JSON.stringify(itemData));
          display(); // Re-render the list
        }
      });
      div.classList.remove('test');
    });
  });
};

export default display;
