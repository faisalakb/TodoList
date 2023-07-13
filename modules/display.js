const listContainer = document.getElementById('ulId');
const checkBox = document.createElement('input');
const div = document.createElement('div');
div.innerHTML = '<span class="delete-icon hide"><i class="fa fa-trash delEd"></i></span>';
div.setAttribute('class', 'test');
checkBox.type = 'checkbox';
checkBox.setAttribute('class', 'chbox');

const display = () => {
  listContainer.innerHTML = ''; // Clear the list container
  if (localStorage.length === 0) {
    localStorage.clear();
  }

  const txt = localStorage.getItem('todoListItems');
  const itemData = JSON.parse(txt);

  itemData.forEach((element) => {
    const section = document.createElement('section');
    section.id = 'se';

    const liTag = document.createElement('li');
    const text = document.createTextNode(element.description);
    liTag.setAttribute('data-index', element.index);
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
      if (checkbox.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
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
      deleteIcon.addEventListener('click', (e) => {
        const index = parseInt(liTag.getAttribute('data-index'), 10);
        const itemIndex = itemData.findIndex((element) => element.index === index);
        if (itemIndex !== -1) {
          itemData.splice(e.itemIndex, 1);
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

  return 0;
};

export default display;
