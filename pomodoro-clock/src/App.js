import './App.css';
import {useState} from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [displayTime, setDisplayTime] = useState(25*60); // 25 minutes
  const [TimerOn, setTimerOn] = useState(false);

  const formatTime = (time)=>{
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes> 10 ? minutes : "0" + minutes}:${seconds> 10 ? seconds : "0" + seconds}` 
  }
 
  const handleChangeBreakLength = (number, type)=>{
    if(type==="break"){
      if(breakLength<=1 && number < 0){
        return;
      }
      setBreakLength(prev => prev + number);
     
    }
    else{
      if(sessionLength<=1 && number < 0){
        return;
      }
      setSessionLength(prev => prev + number);
      // check if the timer is on
      if(!TimerOn){
        setDisplayTime(prev => prev + number*60);
      }
    }
     
  }

  const controlTimer =()=>{

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
            <button onClick={()=> handleChangeBreakLength(-1,"session")} >-</button>
            <p>{sessionLength}</p>
            <button onClick={()=> handleChangeBreakLength(1,"session")}>+</button>
          </div>
        </div>
      </section>
      <h1 className="title">Pomodoro Clock</h1>
      <section className="App">
       <h1>{formatTime(displayTime)}</h1>
       <div className="control-buttons" onClick={controlTimer}>
         {TimerOn? <button>Pause</button> : <button>Play</button>}
       </div>
       <div className="reset-button">
         <button>reset</button>
       </div>
      </section>
    </main>
  );
}

export default App;
