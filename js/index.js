function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return +a - +b;
}

function multiply(a, b) {
  return +a * +b;
}

function divide(a, b) {
  return +a/+b;
}

function module(a, b) {
  return +a % +b;
}

function operator(operation, a, b) {
  console.log(`curr:${b} prev:${a}`);
  console.log(operation);
  switch(operation){
    case "add":
      return add(a,b);
    case "subtract":
      return subtract(a,b);
    case "multiply":
      return multiply(a,b);
    case "divide":
      return divide(a,b);
    case "module":
      return module(a,b);
    default:
      break;
  }
}

function strToNum(str) {
  switch(str) {
    case "nine":
      return "9";
    case "eight":
      return "8";
    case "seven":
      return "7";
    case "six":
      return "6";
    case "five":
      return "5";
    case "four":
      return "4";
    case "three":
      return "3";
    case "two":
      return "2";
    case "one":
      return "1";
    case "zero":
      return "0";
    case "period":
      return ".";
    default:
      break;
  }
}

let currVal = "";
let currOperation = "";
let prevVal = "";
let operationPressed = false;
let continueOperating = false;
let clearPressed = 0;

let displayResult = document.querySelector('#final');

function addToDisplay(num){
  num = strToNum(num);
  currVal += num;
  displayResult.textContent = currVal;
}

let allBtns = document.querySelectorAll('button');

allBtns.forEach((btn) => {

  btn.addEventListener('click', (e) => {
    if(e.target.classList.contains("operation"))
    {
      if( !continueOperating ) {
        prevVal = currVal;
      }
      currVal = "";
      displayResult.textContent = "";
      currOperation = e.target.id;
      operationPressed = true;
    }
    else if(e.target.classList.contains("num"))
    {
      if(continueOperating && !operationPressed)
      {
        currVal = "";
        prevVal = "";
        continueOperating = false;
      }
      addToDisplay(e.target.id);
    }
    else if(e.target.id === "reset")
    {
      if(clearPressed >= 1){
        prevVal = "";
        operationPressed = false;
        continueOperating = false;
        clearPressed = 0;
      }
      else
      {
        ++clearPressed;
      }
      currVal = "";
      displayResult.textContent = "0";
      console.log(clearPressed);
    }
    else if( operationPressed && e.target.id != "result")
    {
      addToDisplay(e.target.id);
    }
    else if( e.target.id === "result" )
    {
      const operatorResult = operator(currOperation, prevVal, currVal);
      currVal = "";
      prevVal = "";
      // console.log(toString(operatorResult));
      displayResult.textContent = operatorResult;
      prevVal = operatorResult;
      operationPressed = false;
      continueOperating = true;
    }
  })
} )
