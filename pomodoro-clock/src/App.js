import './App.css';
import {useState} from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [displayTime, setDisplayTime] = useState(25*60); // 25 minutes

  const formatTime = (time)=>{
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes> 10 ? minutes : "0" + minutes}:${seconds> 10 ? seconds : "0" + seconds}` 
  }
 
  const handleChangeBreakLength = (number, type)=>{
    if(type==="break"){
      setBreakLength(prev => prev + number);
     
    }
    else{
      setSessionLength(prev => prev + number);
    }
     
  }


  return (
    <main className="container">
      <section className="time-controls">
        <div id="break-label">
          <p>Break Length</p>
          <div className="button-container">
            <button onClick={()=> handleChangeBreakLength(-1,"break")}>-</button>
            <p>{breakLength}</p>
            <button onClick={()=> handleChangeBreakLength(1,"break")}>+</button>
          </div>
        </div>
        <div id="section-label">
          <p>Session Length</p>
          <div className="button-container">
            <button >-</button>
            <p>{sessionLength}</p>
            <button>+</button>
          </div>
        </div>
      </section>
      <h1 className="title">Pomodoro Clock</h1>
      <section className="App">
       <h1>{formatTime(displayTime)}</h1>
      </section>
    </main>
  );
}

export default App;
