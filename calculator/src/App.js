import './App.css';
import {useState} from 'react';

function App() {
  const [result, setResult] = useState("");

 const handleClick = (value)=>{
   setResult(value);
   console.log(result);
 }
  return (
    <div className="App">
     <button onClick={()=> handleClick("1")}>1</button>
     <button onClick={()=> handleClick("+")}>+</button>
    </div>
  );
}

export default App;
