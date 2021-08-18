import './App.scss';
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

const operators = ["*","+","/","-"];

function App() {
  const [result, setResult] = useState(0);
  const [expression, setExpression] = useState("");

 const handleDisplay = (value)=>{
    // handles the decimal point
    // 1. split the expression since operators have spaces around them to make it easier
    const arrValue = expression.split(" ");
    // 2. check if the last element in the array has a decimal value
    const lastValueHasDecimal =
      arrValue[arrValue.length - 1].indexOf(".") > -1 && value === ".";
    // 3 . if it has a decimal value return the previous expression, else return the epression+value
      setExpression(lastValueHasDecimal
        ? expression
        : expression.concat(value))
     
    // makes sure to append a number after the equal to sign so we can continue with the calculation
    if(expression.includes("=")){
      if(/[1-9]/.test(value)){
        setExpression(value);
        setResult(0);
      }
      else{
        setExpression(result + value);
        setResult(0);
      }
    }
  
 }

 const handleCalculate = ()=>{
   if(expression===""){
     return;
   }

   // used the math-expression-evaluator library instead of eval since eval is unsafe
    let result;
    try {
      result = mexp.eval(expression); 
      // set the results to 2 decimal places if it contains a decimal point
      if(result.toString().includes(".")){
        result = result.toFixed(2);
      }
    } catch (error) {
      alert(error.message);
      result = "NaN";
    }

    // update "result" with the result of evaluation
    setResult(result);
    setExpression(prev=>`${prev}  = ${result}`);
 }

 const handleAllClear = ()=>{
   setExpression("");
   setResult(0);
  
 }

 const handleClear =()=>{
   setExpression(prev=>
    prev.split("")
    .slice(0, -1)
    .join("")
    );
    setResult(0);
 }
  return (
    <main className="container">
      <div className="App">
        <section className="notch">

        </section>
        <section className="display">
          <h1>{expression}</h1>
          <h2>{result}</h2>
        </section>
        <section className="button-container">
          {calculatorNumbers.map((btn)=>{
            return <button 
            className="btn-number"
            id={btn.id}
            key={btn.id}
            value={btn.value}
             onClick={()=> handleDisplay(btn.value)}
             >
               {btn.value}
             </button>
          })}
          {/* <button onClick={()=> handleDisplay("1")}>1</button>
          <button onClick={()=> handleDisplay("2")}>2</button>
          <button onClick={()=> handleDisplay(" + ")}>+</button> */}
          <button onClick={handleCalculate}>=</button>
          <button onClick={handleAllClear}>AC</button>
          <button onClick={handleClear}>C</button>
        </section>
        <footer className="footer">
          <div className="bar"></div>
        </footer>

      </div>
    </main>
  );
}

export default App;
