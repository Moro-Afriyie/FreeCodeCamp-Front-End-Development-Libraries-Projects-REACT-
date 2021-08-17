import './App.css';
import {useState} from 'react';
import mexp from "math-expression-evaluator";

const calculatorNumbers = [
  {
    id: "divide",
    value: " / "
  },
  {
    id: "multiply",
    value: " * "
  },
  {
    id: "seven",
    value: "7"
  },
  {
    id: "eight",
    value: "8"
  },
  {
    id: "nine",
    value: "9"
  },
  {
    id: "substract",
    value: " - "
  },
  {
    id: "four",
    value: "4"
  },
  {
    id: "five",
    value: "5"
  },
  {
    id: "six",
    value: "6"
  },
  {
    id: "plus",
    value: " + "
  },
  {
    id: "one",
    value: "1"
  },
  {
    id: "two",
    value: "2"
  },
  {
    id: "three",
    value: "3"
  },
  {
    id: "decimal",
    value: "."
  },
  {
    id: "zero",
    value: "0"
  }
];

const operators = ["*","+","/","-"]
function App() {
  const [result, setResult] = useState(0);
  const [expression, setExpression] = useState("");
  const [decimal, setDecimal] = useState(true); // state to handle the . key so it doesn't appear more than once

 const handleDisplay = (value)=>{
  if(value === "." && decimal){
    setDecimal(false);
    setExpression(prev=>prev + value);
  }
  // if it's an operation sign 
  else if (operators.includes(value) && decimal===false) {
    setDecimal(true);
    setExpression(prev=>prev + value);
  }
  // if it's a number 
  else if (!operators.includes(value) && value!=="."){
    setExpression(prev=>prev + value);
  }

  if(expression[expression.length-1]==="="){
    if(/[1-9]/.test(value)){
      setExpression(value);
    }
    else{
      setExpression(result + value)
    }
  }
  
 }

 const handleCalculate = ()=>{
   // used the math-expression-evaluator library instead of eval since eval is unsafe
    let result;
    try {
      result = mexp.eval(expression);
    } catch (error) {
      alert(error.message);
      result = "NaN";
    }

    // update "result" with the result of evaluation
    setResult(result);
    setExpression(prev=>prev + " = ");
 }

 const handleAllClear = ()=>{
   setExpression("");
   setResult(0);
   setDecimal(true);
 }

 const handleClear =()=>{
   setExpression(prev=>
    prev.split("")
    .slice(0, -1)
    .join("")
    );

    // implement the decimal logic
    if(expression.split("").includes(".")){
      setDecimal(false);
    }
    else{
      setDecimal(true);
    }
    // setDecimal(false);  
    setResult(0);
 }
  return (
    <main>
      <div className="App">
        <button onClick={()=> handleDisplay("1")}>1</button>
        <button onClick={()=> handleDisplay("2")}>2</button>
        <button onClick={()=> handleDisplay("+")}>+</button>
        <button onClick={handleCalculate}>=</button>
        <button onClick={()=> handleDisplay(".")}>.</button>
        <button onClick={handleAllClear}>AC</button>
        <button onClick={handleClear}>C</button>

        <h1>{expression}</h1>
        <h2>{result}</h2>
      </div>
    </main>
  );
}

export default App;
