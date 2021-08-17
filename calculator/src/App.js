import './App.css';
import {useState} from 'react';

function App() {
  const [result, setResult] = useState(0);
  const [expression, setExpression] = useState("")

 const handleClick = (value)=>{
  setExpression(prev=>prev + value);
 }

 const handleCalculate = ()=>{
  setExpression(prev=>prev + "=");
  setResult(eval(expression))
 }
  return (
    <main>
      <div className="App">
        <button onClick={()=> handleClick("1")}>1</button>
        <button onClick={()=> handleClick("2")}>1</button>
        <button onClick={()=> handleClick("+")}>+</button>
        <button onClick={()=> handleCalculate()}>=</button>
        <h1>{expression}</h1>
        <h2>{result}</h2>
      </div>
    </main>
  );
}

export default App;
