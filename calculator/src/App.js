import './App.css';
import {useState} from 'react';
// import mexp from "math-expression-evaluator";

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


function App() {
  const [result, setResult] = useState(0);
  const [expression, setExpression] = useState("")

 const handleDisplay = (value)=>{
  setExpression(prev=>prev + value);
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
   // used the math-expression-evaluator library instead of eval since eval it is unsafe
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
 }

 const handleClear =()=>{
   setExpression(prev=>
    prev.split("").slice(0, prev.length-1).join(""));
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
        <h1>{expression}</h1>
        <h2>{result}</h2>
      </div>
    </main>
  );
}

export default App;
