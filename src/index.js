import './style.css';

const listContainter = document.getElementById('ulId');
const checkBox = document.createElement('input');
const div = document.createElement('div');
div.setAttribute('class', 'test');
checkBox.type = 'checkbox';
checkBox.setAttribute('class', 'chbox');

const todoList = [{ description: 'some todos', completed: false, index: 0 },
  { description: 'second todos', completed: false, index: 1 },
  { description: 'Third todos', completed: false, index: 2 }];
const todoListJson = JSON.stringify(todoList);
localStorage.setItem('todoList', todoListJson);
const txt = localStorage.getItem('todoList');
const parseTxt = JSON.parse(txt);

parseTxt.forEach((element) => {
  const liTag = document.createElement('li');
  const text = document.createTextNode(element.description);
  liTag.appendChild(text);
  listContainter.appendChild(checkBox);
  listContainter.appendChild(liTag);
  listContainter.appendChild(div);
  listContainter.innerHTML += '<br>';
});