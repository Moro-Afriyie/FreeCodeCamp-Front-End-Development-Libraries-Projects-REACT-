import './App.css';
import {useState} from 'react';

function App() {
  const [result, setResult] = useState(0);
  const [expression, setExpression] = useState("")

 const handleDisplay = (value)=>{
  setExpression(prev=>prev + value);
 }

 const handleCalculate = ()=>{
  setResult(eval(expression));
  setExpression(prev=>prev + "=");
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
        <button onClick={()=> handleCalculate()}>=</button>
        <h1>{expression}</h1>
        <h2>{result}</h2>
      </div>
    </main>
  );
}

export default App;
