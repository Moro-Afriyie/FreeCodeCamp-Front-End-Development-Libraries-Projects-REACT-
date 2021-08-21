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
  const [currentValue, setCurrentValue] = useState("");

 const handleDisplay = (value)=>{
    if(operators.includes(value) && expression===""){
      return;
    }
    // handles the decimal point
    else if (value===".") {
      // 1. split the expression since operators have spaces around them to make it easier
    const arrValue = currentValue.split(" ");
     // 2. check if the last element in the array has a decimal value
     const lastValueHasDecimal = arrValue[arrValue.length - 1].indexOf(".") > -1 && value === ".";
    // 3 . if it has a decimal value return the previous expression, else return the epression+value
      setCurrentValue(lastValueHasDecimal
        ? currentValue
        : currentValue.concat(value))
          setExpression(lastValueHasDecimal
        ? expression
        : expression.concat(value))
        return;
    }
    // handles the multiple zeros bug
    else if (value==="0") {
    const arrValue = currentValue.split("");
      if(arrValue.length===1 && arrValue[0]==="0"){
        return;
      }
    }
    if(operators.includes(currentValue) && !operators.includes(value)){
      setCurrentValue(currentValue.replace(currentValue,value));
      setExpression(expression.concat(value));
      return
    }
    if(operators.includes(value)){
      setCurrentValue(value);
    } else{
      setCurrentValue(currentValue.concat(value));
    }
   
    setExpression(expression.concat(value));
      
    // makes sure to append a number after the equal to sign so we can continue with the calculation
    if(expression.includes("=")){
      if(/[0-9]/.test(value)){
        setExpression(value);
        setResult(0);
        setCurrentValue(value);
      }
      else{
        setExpression(result + value);
        setResult(0);
        setCurrentValue(value);
      }
    }
  
 }

 const handleCalculate = ()=>{
   if(expression===""){
     return;
   }
  const filteredExpression = expression.replace(/\s+/g, '').match(/(\*|\+|\/|-)?(\.|-)?\d+/g).join('');
  // used the math-expression-evaluator library instead of eval since eval is unsafe
    let result;
    try {
      result = mexp.eval(filteredExpression); 
      // set the results to 4 decimal places if it contains a decimal point
      if(result.toString().includes(".")){
        if(result.toString().split(".")[1].length>4)
        result = result.toFixed(4);
      }
    } catch (error) {
      alert(error.message);
      result = "Error";
      setExpression("");
    }

    // update "result" with the result of evaluation
    setCurrentValue("");
    setResult(result);
    setExpression(prev=>`${prev}  = ${result}`);
 }

 const handleAllClear = ()=>{
   setExpression("");
   setResult(0);
   setCurrentValue("");
  
 }

 const handleClear =()=>{
   setExpression(prev=>
    prev.split("")
    .slice(0, -1)
    .join("")
    );
    setResult(0);
    setCurrentValue(prev=>
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
          <div id="display2">
            <h3>{expression}</h3>
            <h1 id="display">{currentValue ===""? result:currentValue}</h1>
          </div>
        </section>
        {/* ± % ÷ × − + = */}
        <section className="button-container">
        <button onClick={handleAllClear} id="clear">AC</button>
          <button onClick={handleClear} id="btn-clear">C</button>
          {/* <button onClick={()=>handleDisplay("%")} id="toggle">%</button> */}
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
