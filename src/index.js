let field = [];
let appEl = document.getElementById("app");
const but = document.getElementById("but");
let cell = { x: 0, y: 0, state: false };
let timer = null;
let color = "green";
const WIDTH = "600px";
const HEIGHT = "800px";
const ROWS = 15;
const PLACES = 15;

/**
 * создание таблицы для игры
 * @param width
 * @param height
 * @returns {HTMLTableElement}
 */
function createTable(width, height) {
  const table = document.createElement("table");
  table.setAttribute("width", width);
  table.setAttribute("height", height);
  return table;
}

function CreateCell(x, y, state) {
  this.x = x;
  this.y = y;
  this.state = state;
}

/**
 * получить первоначальный статус
 * @returns boolean
 */
function getState() {
  const i = Math.random() * 10;
  if (i >= 4) {
    return true;
  }
  return false;
}

/**
 * есть еще живые клетки?
 * @returns {boolean}
 */
function isAnyoneAlive() {
  for (let i = 0; i < field.length; i += 1) {
    if (field[i].state === true) {
      return false; // TODO НЕ Ошибиться здесь еще раз!
    }
  }
  return true;
}

/**
 * поменять цвет клетки
 * @returns {string}
 */
function getColor() {
  switch (color) {
    case "green": {
      color = "blue";
      return color;
    }
    case "blue": {
      color = "red";
      return color;
    }
    case "red": {
      color = "brown";
      return color;
    }
    case "brown": {
      color = "green";
      return color;
    }
    default: {
      return color;
    }
  }
}

function createButton() {
  const button = document.createElement("button");
  button.style.width = "100%";
  button.style.height = "100%";
  button.style.padding = 0;
  button.type = "button";
  return button;
}

/**
 * получить количество живых соседей
 * @param x, y, state
 * returns count
 */
function getNumOfAliveNeighbours(x, y) {
  let count = 0;
  for (let i = x - 1; i < x + 2; i += 1) {
    for (let j = y - 1; j < y + 2; j += 1) {
      if (j === y && i === x) {
        j += j;
      }
      const box = field.find((el) => el.x === i && el.y === j);
      if (box !== undefined && box.state) {
        count += 1;
      }
    }
  }
  return count;
}

/**
 * получить новое состояние
 *
 */
function getNewState() {
  for (let i = 0; i < field.length; i += 1) {
    const count = getNumOfAliveNeighbours(field[i].x, field[i].y);
    // если ячейка жива
    if (field[i].state && (count > 3 || count < 2)) {
      field[i].state = false;
    }
    // если ячейка мертва
    else if (count === 3) {
      field[i].state = true;
    }
  }
  return field;
}

/**
 *
 * @param htmlElement
 * первоначальное формирование поля
 * returns void
 */
function drawField(htmlElement) {
  const table = createTable(WIDTH, HEIGHT);
  for (let j = 0; j < ROWS; j += 1) {
    const tr = document.createElement("tr");
    for (let i = 0; i < PLACES; i += 1) {
      const td = document.createElement("td");
      cell = new CreateCell(i, j, getState());
      field.push(cell);
      if (cell.state) {
        td.setAttribute("bgcolor", color);
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  htmlElement.appendChild(table);
}

function getNewField() {
  const table = createTable(WIDTH, HEIGHT);
  for (let j = 0; j < ROWS; j += 1) {
    const tr = document.createElement("tr");
    for (let i = 0; i < PLACES; i += 1) {
      const td = document.createElement("td");
      cell = field.find((el) => el.x === i && el.y === j);
      if (cell.state) {
        const button = createButton();
        button.style.backgroundColor = getColor();
        button.addEventListener("click", function () {
          button.style.backgroundColor = "white";
        });
        if (button.style.backgroundColor === "white") {
          cell.state = false;
        }
        td.appendChild(button);
        td.setAttribute("style.padding", 0);
      } else {
        const button = createButton();
        button.style.backgroundColor = "white";
        button.addEventListener("click", function () {
          button.style.backgroundColor = getColor();
        });
        if (button.style.backgroundColor !== "white") {
          cell.state = true;
        }
        td.appendChild(button);
        td.setAttribute("style.padding", 0);
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}

/**
 * начинает игру
 */
function start() {
  // каждую секунду
  timer = setInterval(() => {
    // считать новое состояние
    field = getNewState();
    // отрисовывать его
    appEl.innerHTML = "";
    appEl.appendChild(getNewField());
    // если нет живых клеток - вывести алерт
    if (isAnyoneAlive()) {
      clearInterval(timer);
      console.log("Every body died! =(");
    }
  }, 1500);
}

const buttonShort = document.createElement("button");
buttonShort.textContent = "START";
buttonShort.style.width = "150px"; // setting the width to 20 px
buttonShort.style.color = "blue"; // setting the color to teal
buttonShort.style.margin = "10px";

but.appendChild(buttonShort);
buttonShort.addEventListener("click", function () {
  if (appEl == null) {
    appEl = document.getElementById("app");
  } else if (timer == null) {
    drawField(appEl);
    start();
  }
});

const buttonStart = document.createElement("button");
buttonStart.textContent = "STOP";

buttonStart.style.width = "150px"; // setting the width to 20 px
buttonStart.style.color = "blue"; // setting the color to teal
but.appendChild(buttonStart);
buttonStart.addEventListener("click", function () {
  appEl = null; // TODO  PS  не знаю как правидьно заканчивать игру либо ставить на паузу... пока так
});
