// Variables
var xGlobal = 0;
var yGlobal = 0;
var operatorGlobal = "";

const operatorSet = new Set(["x", "+", "÷", "-"]);

// Your typical calulcation functions
function add(x, y) {
  return x + y;
}

function substract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

// Calculation function
function operate(x, operator, y) {
  // A calculation consists of three variables casted
  let result;
  if (operator === "x") {
    result = multiply(x, y);
  } else if (operator === "+") {
    result = add(x, y);
  } else if (operator === "-") {
    result = substract(x, y);
  } else if (operator === "÷") {
    if (y === 0) {
      result = "Be fr";
    } else {
      result = divide(x, y);
    }
  }
  return result;
}

// Onclick for each bttn
function displayValue(value) {
  document.getElementById("output").innerText += value; // Append bc we adding to display if num
  console.log("Value displayed");
}

function displayResult(result) {
  document.getElementById("output").innerText = result; // Append to show result
  console.log("Result displayed");
}

function clearResult() {
  document.getElementById("output").innerText = ""; // Delete the display
  console.log("Result cleared");
}

// Perform diff operation based on what's being pressed
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.innerText.trim();

    if (value === "=") {
      // Perform calculation logic for "="
      yGlobal = Number(document.getElementById("output").innerText);
      const result = operate(Number(xGlobal), operatorGlobal, yGlobal);
      displayResult(result);
      xGlobal = 0;
      yGlobal = 0;
      operatorGlobal = "";
    } else if (value === "C") {
      // Clear the display
      clearResult();
    } else if (operatorSet.has(value)) {
      // Handle operators (+, -, x, ÷)
      if (operatorGlobal) {
        // iff there's already an operator, apply previous operation before switching
        yGlobal = Number(document.getElementById("output").innerText);
        xGlobal = operate(Number(xGlobal), operatorGlobal, yGlobal);
        displayResult(xGlobal); // Update display withintermediate result
      } else {
        // If no operator yet get first value for xGlobal
        xGlobal = Number(document.getElementById("output").innerText);
      }
      operatorGlobal = value;
      clearResult();
    } else {
      // Handle number and decimal buttons
      displayValue(value);
    }
  });
});
