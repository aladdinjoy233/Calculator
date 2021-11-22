// Variables
const calcBtns = document.querySelectorAll(".calc-btn");
const input = document.querySelector('.input');
const output = document.querySelector('.output');
let operators = ["div", "mul", "sub", "add"];
let values = [];

// Function to easily create the img tags
const imgTag = operator => `<img src="/img/${operator}.svg">`

// Function used to push VALUE array items into the input
const pushToInput = arr => {

  input.innerHTML = "";

  arr.forEach(item => {

    if (operators.includes(item)) {
      input.innerHTML += imgTag(item);
      return;
    };

    input.innerHTML += item;
  });
}

// Function to push to output
const pushToOutput = arr => {
  output.innerHTML = ""
  output.innerHTML += arr;
}

// Basic Math Functions
const div = (a, b) => a / b;
const mul = (a, b) => a * b;
const sub = (a, b) => a - b;
const add = (a, b) => a + b;
// Operate Function
const operate = (operator, a, b) => {
  switch (operator) {
    case "div":
      return div(a, b);
    case "mul":
      return mul(a, b);
    case "sub":
      return sub(a, b);
    case "add":
      return add(a, b);
  }
};

// ["10", "sub", "5"]
// Function to run when "=" is pressed
const solve = arr => {

  if (arr.length === 1) return arr[0];

  // Multiply
  if (arr.includes("mul")) {
    const opIndex = arr.indexOf("mul");
    const numAfter = parseFloat(arr[opIndex + 1])
    const numBefore = parseFloat(arr[opIndex - 1])
    const answer = operate(arr[opIndex], numBefore, numAfter);

    arr.splice(opIndex - 1, 3, `${answer}`);

    return solve(arr);
  };

  // Divide
  if (arr.includes("div")) {
    const opIndex = arr.indexOf("div");
    const numAfter = parseFloat(arr[opIndex + 1])
    const numBefore = parseFloat(arr[opIndex - 1])
    const answer = operate(arr[opIndex], numBefore, numAfter);

    arr.splice(opIndex - 1, 3, `${answer}`);

    return solve(arr);
  };

  // Addition
  if (arr.includes("add")) {
    const opIndex = arr.indexOf("add");
    const numAfter = parseFloat(arr[opIndex + 1])
    const numBefore = parseFloat(arr[opIndex - 1])
    const answer = operate(arr[opIndex], numBefore, numAfter);

    arr.splice(opIndex - 1, 3, `${answer}`);

    return solve(arr);
  };

  // Subtraction
  if (arr.includes("sub")) {
    const opIndex = arr.indexOf("sub");
    const numAfter = parseFloat(arr[opIndex + 1])
    const numBefore = parseFloat(arr[opIndex - 1])
    const answer = operate(arr[opIndex], numBefore, numAfter);

    arr.splice(opIndex - 1, 3, `${answer}`);

    return solve(arr);
  };

}

function pressedEquals(last) {
  
  if (!last) return;

  if (input.classList.contains("bottom")) {
    input.classList.remove("bottom");
    output.classList.add("has_content");
  }

  pushToOutput(solve(values));
}

function pressedAC() {
  values.splice(0, values.length);
  pushToInput(values);
  pushToOutput(values);
}

function pressedDecimal(last, keyPressed) {
  if (last !== undefined && last.substr(last.length - 1, last.length) === ".") return;

    if (last !== undefined && last.includes(".")) return;

    if (!last && last !== "") {
     values.push("0");
    }

    if (last === "") {
      values[values.length - 1] = `${values[values.length - 1]}${0}`;
    }
    
    values[values.length - 1] = `${values[values.length - 1]}${keyPressed}`;
    pushToInput(values);
}

function pressedBack(last) {
  if (last == "" && operators.includes(values[values.length - 2])) {
    values.pop();
    values.pop();
    pushToInput(values);
    return;
  }
  // If there is no value, do nothing. . .
  if (!last) return;
  
  if (operators.includes(values[values.length - 1])) {
    values.pop();
    pushToInput(values);
    return;
  }

  if (last.length === 1) values.pop();

  if (last.length > 1) {
    values[values.length - 1] = last.substr(0, last.length - 1);
  }

  pushToInput(values);
}

function pressedOperator(last, key) {
  if (last == "" && operators.includes(values[values.length - 2])) return;

    if (!last) values.push("0");

    values.push(key);
    values.push("");
    pushToInput(values);
}

function pressedNum(last, key) {
  // If last value doesn't exist, push key to values array
  if (!last && last !== "") {
    values.push("");
    last = values[values.length - 1];
  }
  
  // If the last values array item has a number, append to string
  if (last.length > 0) values[values.length - 1] = `${last}${key}`;
  
  // If the last values array doesn't have a number, add it to string
  if (last.length === 0) values[values.length - 1] = `${key}`;
  
  pushToInput(values);
}


// Display numbers input
calcBtns.forEach(btn => btn.addEventListener("click", e => {

  let keyPressed = e.target.dataset.key;
  let lastValuesItem = values[values.length - 1];

  if (!input.classList.contains("bottom")) {
    input.classList.add("bottom");
    output.classList.remove("has_content");
  }

  // If equals is pressed, then solve everything
  if (keyPressed === "equals") {
    pressedEquals(lastValuesItem);
    return;
  }

  // If AC is pressed then delete everything from the array
  if (keyPressed === "AC") {
    pressedAC();
    return;
  }

  // If . (decimal) is pressed then decimal it
  if (keyPressed === ".") {
    pressedDecimal(lastValuesItem, keyPressed);
    return;
  }

  // If back is pressed remove last num from values array
  if (keyPressed === "back") {
    pressedBack(lastValuesItem);
    return;
  }

  // If div, mul, add, or sub is pressed then add it to array and create a new item
  if(operators.includes(keyPressed)) {
    pressedOperator(lastValuesItem, keyPressed);
    return;
  };

  pressedNum(lastValuesItem, keyPressed);

}))

const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "/", "+", "-", "Backspace", ".", "Enter", "Delete"];
const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

document.addEventListener('keydown', e => {

  // If user presses a not valid key, return
  if (!validKeys.includes(e.key)) return;

  let lastValuesItem = values[values.length - 1];

  if (!input.classList.contains("bottom")) {
    input.classList.add("bottom");
    output.classList.remove("has_content");
  }

  if (e.key === "Enter") pressedEquals(lastValuesItem);

  if (e.key === "Delete") pressedAC();
  
  if (e.key === ".") pressedDecimal(lastValuesItem, e.key);

  if (e.key === "Backspace") pressedBack(lastValuesItem);

  if (e.key === "*") pressedOperator(lastValuesItem, "mul");
  if (e.key === "/") pressedOperator(lastValuesItem, "div");
  if (e.key === "+") pressedOperator(lastValuesItem, "add");
  if (e.key === "-") pressedOperator(lastValuesItem, "sub");

  if (nums.includes(e.key)) pressedNum(lastValuesItem, e.key);

})