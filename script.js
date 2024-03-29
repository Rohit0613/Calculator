let runningTotal = 0;
let buffer = 0;
let previewOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
  if(isNaN (value)){
    handleSymbol(value);

  }else{
    handleNumber(value);
  }
  screen.innerText = buffer;
}
function handleSymbol(symbol){
  switch(symbol){
    case 'CLR':
      buffer = '0';
      runningTotal = 0;
      break;
    case '=':
      if(previewOperator === null){
        return

      }
      flushOperation(parseInt(buffer));
      previewOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case 'DEL':
      if(buffer.length ===1){
        buffer = '0';
      }else{
        buffer = buffer.substring(0, buffer.length - 1);

      }
      break;
    case '+':
    case '−':
    case '×':
    case '÷':
      handleMath(symbol);
      break;
    case '%':
     handlePercentage();
      break;
  }
}
function handlePercentage() {
  const percentageValue = parseFloat(buffer) / 100;
  buffer = percentageValue.toString();
}

function handleMath(symbol){
  if(buffer === '0'){
    return;
  }
  const intBuffer =parseInt(buffer);

  if(runningTotal === 0){
    runningTotal = intBuffer;
  }else{
    flushOperation(intBuffer);
  }
  previewOperator =symbol;
  buffer = '0';
}
function flushOperation(intBuffer) {
  if(previewOperator === '+'){
    runningTotal += intBuffer;
  }else if(previewOperator === '−'){
    runningTotal -= intBuffer;
  }else if(previewOperator === '×'){
    runningTotal *= intBuffer;
  }else if(previewOperator === '÷'){
    runningTotal /= intBuffer;
  }
}

function handleNumber(numberString){
  if(buffer === "0"){
    buffer = numberString;
  }else{
    buffer+=numberString;
  }
}

function init(){
  document.querySelector('.calc-buttons').addEventListener('click', function(event){
    buttonClick(event.target.innerText);

  })
}

init();
