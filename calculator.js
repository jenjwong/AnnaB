class Input {
  constructor() {
    this.value = '';
    this.history = [];
    this.wasCalc = false;
    this['('] = 0;
    this[')'] = 0;
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
    this.resetBracketCount();
  }
  storeHistory(node) {
    this.history.push(node);
  }
  resetBracketCount() {
    this['('] = 0;
    this[')'] = 0;
  }
}

const input = new Input;


const clear = function () {
  updateDisplay('');
  input.clear();
  input.resetBracketCount();
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
  if (input.history.length < 2 || keyWasOperator() || !validBrackets()) {
    displayError();
    return false;
  }
  return true;
};

const updateDisplay = function (val) {
  const display = document.querySelector('.display');

  display.textContent = val;
};


const displayError = function () {
  updateDisplay('error');
  setTimeout(function () {
    input.clear();
    updateDisplay('');
  }, 2000);
};

const validBrackets = function(value) {
  if (value === '(') {
    input['('] += 1;
  }
  if (value === ')') {
    input[')'] += 1;
  }
  return input['('] === input[')'];
}

const cloneNode = function(node, value) {
  let nodeCopy = node.cloneNode()
  nodeCopy.textContent = value;
  return nodeCopy;
}


const handleBrackets = function(node, type) {
  const bracket = node.textContent;
  const lastKey = input.history[input.history.length-1];
  const histLength = input.history.length;
  let displayNode = node;
  if ( histLength > 0 && bracket === '(' && !keyWasOperator(lastKey)) {
    displayNode = cloneNode(node, '*(')
  } else if (histLength > 0 && !keyWasOperator(node)) {
    displayNode = cloneNode(node, '*' + node.textContent)
  }
    input.storeHistory(displayNode);
    input.update(displayNode.textContent.trim());
}

const keyPressValidation = function(node) {
  if (keyWasOperator(node) && input.history.length > 0 && keyWasOperator(input.history[input.history.length-1])) {
    displayError()
    return false
  }
  return true
}



const keyPress = function () {

  if (!keyPressValidation(this)) {
    return
  }


  if (input.wasCalc && !keyWasOperator(this) && this.textContent !== '(') {
    clear();
  }
  if (this.textContent === '(' || this.textContent === ')') {
    validBrackets(this.textContent);
  }

  if (this.textContent === '(' || input.history.length > 0 && input.history[input.history.length-1].textContent === ')') {
    handleBrackets(this)
  }  else {
    input.storeHistory(this);
    input.update(this.textContent.trim());
  }
    updateDisplay(input.value);
    input.lastKey = this;
    input.wasCalc = false;


};

const calculate = function () {
  console.log(validBrackets())
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
