import './App.scss';
import {useState} from 'react';
import mexp from "math-expression-evaluator";

const calculatorNumbers = [
  {
    id: "divide",
    value: " / "
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
    id: "multiply",
    value: " * "
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
    id: "subtract",
    value: " - "
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
    id: "add",
    value: " + "
  },
  {
    id: "zero",
    value: "0"
  },
  {
    id: "decimal",
    value: "."
  },
];

const operators = [" * "," + "," / "];

function App() {
  const [result, setResult] = useState(0);
  const [expression, setExpression] = useState("");

 const handleDisplay = (value)=>{
   // handle multiple zeros
    if (value === "0" && expression.length < 2){
      setExpression("0");
      return;
    }
    else if(operators.includes(value) && expression.length<2){
      return;
    }

    // 1. split the expression since operators have spaces around them to make it easier
    const arrValue = expression.split(" ");
    // console.log("array value: ", arrValue[arrValue.length-1])
    let lastValueHasDecimal = false;
      // handles the decimal point
     // 2. check if the last element in the array has a decimal value
    if(arrValue[arrValue.length - 1].indexOf(".") > -1 && value === "."){
      lastValueHasDecimal = arrValue[arrValue.length - 1].indexOf(".") > -1 && value === ".";
    }
    // checks if the value is already starting with a zero
    else if(arrValue[arrValue.length-1].length > 0 && value==="0"){
      // console.log("first number: ", arrValue[arrValue.length-1][0])
      if(arrValue[arrValue.length-1][0] ==="0" && value==="0"){
        lastValueHasDecimal = true;
      }
    }
  
    // 3 . if it has a decimal value return the previous expression, else return the epression+value
      setExpression(lastValueHasDecimal
        ? expression.replace(/\s+/g, '').trim()
        : expression.concat(value).replace(/\s+/g, '').trim())
     
      
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
  const filteredExpression = expression.match(/(\*|\+|\/|\-)?(\.|\-)?\d+/g).join('');
  // used the math-expression-evaluator library instead of eval since eval is unsafe
    let result;
    try {
      result = mexp.eval(filteredExpression); 
      // set the results to 2 decimal places if it contains a decimal point
      if(result.toString().includes(".")){
        result = result.toFixed(4);
      }
    } catch (error) {
      alert(error.message);
      result = "Error";
      setExpression("");
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
        <section  className="display">
          <div id="display">
            <h3>{expression}</h3>
            <h1>{result}</h1>
          </div>
        </section>
        {/* ± % ÷ × − + = */}
        <section className="button-container">
        <button onClick={handleAllClear} id="clear">AC</button>
          <button onClick={handleClear} id="btn-clear">C</button>
          {/* <button onClick={()=>handleDisplay("±")} id="toggle">±</button> */}
           <button  id="toggle">±</button>
          {calculatorNumbers.map((btn)=>{
            return <button 
            className="btn-number"
            id={btn.id}
            key={btn.id}
            value={btn.value}
             onClick={()=> handleDisplay(btn.value)}
             >
               {btn.value===" / "? "÷": btn.value}
             </button>
          })}
          <button onClick={handleCalculate} id="equals">=</button>
        </section>
        <footer className="footer">
          <div className="bar"></div>
        </footer>

      </div>
    </main>
  );
}

export default App;
