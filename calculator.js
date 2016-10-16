class Input {
  constructor() {
    this.value = '';
    this.history = [];
    this.wasCalc = false;
  }
  update(val) {
    this.value += val;
    return this.value;
  }
  set(val) {
    this.value = val;
    return this.value;
  }
  clear() {
    this.value = '';
    this.history = [];
  }
  storeHistory(node) {
    this.history.push(node);
  }
}

const input = new Input;


const clear = function () {
  updateDisplay('');
  input.clear();
};

const keyWasOperator = function(node) {
  let currentNode;
  if (node) {
    currentNode = node;
  } else {
    currentNode = input.history[input.history.length - 1] || document.body;
  }
  const classListArrayCurrent = Array.from(currentNode.classList);
  return classListArrayCurrent.indexOf('operator') === 1;
};

const validInput = function () {
  if (input.history.length < 2 || keyWasOperator()) {
    displayError();
    return false;
  }
  return true;
};

const updateDisplay = function (val) {
  const display = document.querySelector('.display');
  display.textContent = '';
  display.textContent = val;
};

const keyPress = function () {
  if (input.wasCalc && !keyWasOperator(this)) {
    clear();
  }
  input.storeHistory(this);
  input.update(this.textContent.trim());
  updateDisplay(input.value);
  input.lastKey = this;
  input.wasCalc = false;
};

const calculate = function () {
  input.wasCalc = true;
  let result;
  if (!validInput()) {
    input.clear();
    return;
  }
  result = eval(input.value);
  input.set(result);
  updateDisplay(result);
};

const displayError = function () {
  updateDisplay('error');
  setTimeout(function () {
    input.clear();
    updateDisplay('');
  }, 2000);
};


(function () {
  const keys = Array.from(document.querySelectorAll('.input'));
  const calculateButton = document.querySelector('.calculate');
  const clearButton = document.querySelector('.clear');

  calculateButton.addEventListener('click', calculate, false);
  clearButton.addEventListener('click', clear, false);

  for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('click', keyPress, false);
  }
}());

// Basic calculator algorithm that doesn't use eval method.
// Doesn't currently handle order of opperations.

// const calculate = function() {
//   let result = input[0];
//   needsClear = true;
//   for (var i = 1; i < input.length; i+=2) {
//     if (input[i] == '-') {
//       result = result - input[i+1];
//     } else if (input[i] == '+') {
//       console.log(typeof parseInt(result))
//       result = parseInt(result) + parseInt(input[i+1]);
//     } else if (input[i] == '*' || input[i] == 'x') {
//       result = result * input[i+1];
//     } else if (input[i] == '/') {
//       result = result / input[i+1];
//     } else {
//       result = 'error'
//     }
//   }
//   display.textContent = result;
//   input = [];
// }
