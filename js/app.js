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
  if( +b === 0 && +a != 0) return "ERROR";
  let divided = String(+a/+b);
  if( divided.indexOf('.') != -1 && divided.indexOf('.') < divided.length ) return Number(divided).toFixed(2);
  else return Number(divided);
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

// variable for display
let displayResult = document.querySelector('#final');

function addToDisplay(num){
  num = strToNum(num);
  currNum += num;
  displayResult.textContent = currNum;
}

// 1) Create variables
// create variable for step before previous step
let lastStep = "";
// create variable for previous step
let prevStep = "";
// create variable for current step
let currStep = "";
// create variable for current number
let currNum = "";
// create variable for previous number
let prevNum = "";
// create variable to know if operation was pressed before already
let operationAlreadyPressed = false;
// current operation
let currOp = "";
// previous operation
let prevOp = "";
// expression variable
let expression = "";
let expressionDisplay = document.querySelector(".expression");

// 2) get list of all numbers
let btnList = document.querySelectorAll("button");
// add event listener to each number
btnList.forEach( (btn) => {
  btn.addEventListener( 'click', (e) => {
    if( e.target.classList.contains("resetAll") )
    {
      prevNum = "";
      currNum = "";
      currOp = "";
      prevOp = "";
      operationAlreadyPressed = false;
      displayResult.textContent = 0;
      expressionDisplay.textContent = "";
      expression = "";
    }
    else if( e.target.classList.contains("num") )
    {
      // reset current number if operation was pressed in previous step. Make prevNum equal to currNum.
      if( currStep === "operation" )
      {
        prevNum = currNum;
        currNum = "";
      }
      const numberChosen = e.target.id;
      prevStep = currStep;
      currStep = "number";
      addToDisplay(numberChosen);

    }
    else if( e.target.classList.contains("operation") && currStep === "operation")
    {

    }
    else if( e.target.classList.contains("operation") ){
      prevOp = currOp;
      currOp = e.target.id;
      prevStep = currStep;
      currStep = "operation";
      if( operationAlreadyPressed && prevNum != "" && currNum != "" )
      {
        const result = operator(prevOp, prevNum, currNum);
        if( result === "ERROR")
        {
          prevNum = "";
          currNum = "";
          currOp = "";
          prevOp = "";
          operationAlreadyPressed = false;
          displayResult.textContent = "ERROR CANNOT DIVIDE BY 0";
          expressionDisplay.textContent = "";
        }
        else
        {
          prevNum = currNum;
          currNum = result;
          expression = `${currNum} ${e.target.textContent}`;
          expressionDisplay.textContent = expression;
          console.log(currNum);
        }
      }
      else
      {
        expression = `${currNum} ${e.target.textContent}`;
        console.log(expression);
        expressionDisplay.textContent = expression;
        operationAlreadyPressed = true;
      }
    }
    else if( e.target.classList.contains("result") && prevNum != "" && currNum != "" )
    {
      const result = operator(currOp, prevNum, currNum);
      console.log(result);
      if( result === "ERROR")
      {
        prevNum = "";
        currNum = "";
        currOp = "";
        prevOp = "";
        operationAlreadyPressed = false;
        displayResult.textContent = "ERROR CANNOT DIVIDE BY 0";
      }
      else
      {
        prevNum = currNum;
        currNum = result;
        displayResult.textContent = currNum;
        prevStep = currStep;
        currStep = "result";
        expression += ` ${prevNum} = ${currNum}`;
        expressionDisplay.textContent = expression;
        operationAlreadyPressed = false;
      }
    }
    else if( e.target.classList.contains("sign"))
    {
      currNum = String(currNum);
      currNum = (currNum.charAt(0) === "-") ? currNum.substring(1) : `-${currNum}`;
      displayResult.textContent = currNum;
    }
    else
    {

    }
    console.log(e.target);
    const currColor = e.target.style.backgroundColor;
    e.target.style.backgroundColor = "green";
    setTimeout(()=>{
      e.target.style.backgroundColor = currColor;
    }, 115);
  })
})

// get list of all operations
let operationList = document.querySelectorAll(".operation")
