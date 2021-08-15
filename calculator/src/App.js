import './App.css';
import {useState} from 'react';

function App() {
  const [result, setResult] = useState("");
  const [expression, setExpression] = useState("")

 const handleClick = (value)=>{
  setExpression(prev=>prev + value);
 }

 const handleCalculate = ()=>{
  setResult(eval(expression))
 }
  return (
    <main>
      <div className="App">
        <button onClick={()=> handleClick("1")}>1</button>
        <button onClick={()=> handleClick("+")}>+</button>
        <h1>{expression}</h1>
      </div>
    </main>
  );
}

export default App;
