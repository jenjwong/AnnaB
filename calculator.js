let input = '';
let last = -1;

const updateDisplay = function(val, wipe) {
  const display = document.querySelector('.display');
  if (wipe) {
    display.textContent = val;
    return
  }
  display.textContent += val;
}

const validInput = function(node){
  node = node || document.body;
  let classListArray = Array.from(node.classList);
  console.log(last === 1 && input.length % 2 === 0, last, input.lenth%2)


  if(input.slice(input.length) === 1 && input.length % 2 === 0 || classListArray.indexOf('operator') === 1 && last === 1) {
    last = classListArray.indexOf('operator')
    updateDisplay('', true);
    updateDisplay('error');
    setTimeout(function(){
      console.log('called')
      clear();
    }, 1000);
    return false
  }
  last = classListArray.indexOf('operator')
  return true;
}

const keyPress = function() {
  // if (!validInput(this)) {
  //   return
  // }

  input+=this.textContent.trim()
  updateDisplay(this.textContent)
}

const calculate = function() {
  if (!validInput()) {
    return;
  }

  result = eval(input);
  updateDisplay(result, true);
}

const clear = function() {
  updateDisplay('', true)
};

(function(){
  const keys = Array.from(document.querySelectorAll('.input'));
  const calculateButton = document.querySelector('.calculate');
  const clearButton = document.querySelector('.clear');

  calculateButton.addEventListener('click', calculate, false);
  clearButton.addEventListener('click', clear, false);

  for(var i = 0; i < keys.length; i++) {
    keys[i].addEventListener('click', keyPress, false);
  }
}())
