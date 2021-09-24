import './App.css';
import {useState} from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5*60);
  const [sessionLength, setSessionLength] = useState(25*60);
  const [displayTime, setDisplayTime] = useState(25*60); // 25 minutes
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState("break");
  // const [audio, setAudio] = useState(new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"))

  const formatTime = (time)=>{
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes> 9 ? minutes : "0" + minutes}:${seconds>9 ? seconds : "0" + seconds}` 
  }

  const playAudio = ()=>{
    let audio = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");
    audio.currentTime = 0;
    audio.play();
  }
 
  const handleChangeBreakLength = (number, type)=>{
    if(type==="break"){
      if(breakLength<=60 && number < 0){
        return;
      }
      setBreakLength(prev => prev + number);
     
    }
    else{
      if(sessionLength<=60 && number < 0){
        return;
      }
      setSessionLength(prev => prev + number);
      // check if the timer is on
      if(!timerOn){
        setDisplayTime(prev => prev + number);
      }
    }
     
  }

  const controlTimer =()=>{
  let second = 1000;
  let date = new Date().getTime(); // get the current date in seconds
  let nextDate = new Date().getTime() + second;
  // let onBreakVariable = onBreak;
  if(!timerOn){
    let interval = setInterval(()=>{
      date = new Date().getTime();
      if(date > nextDate){
        setDisplayTime((prev) => {
          // console.log({prev, onBreakVariable});
          // if(prev<=0 && !onBreakVariable){
          //   playAudio();
          //   onBreakVariable = true;
          //   setOnBreak(true);
          //   console.log({onBreakVariable});
          //  console.log({breakLength, displayTime,onBreak, onBreakVariable});
          //  return breakLength; // so that the display time is equal to the break time = 5 minutes
          // }
          // else if(prev<=0 && onBreakVariable){
          //   playAudio();
          //   onBreakVariable = false;
          //   setOnBreak(true);
          //   console.log({sessionLength, displayTime,onBreak });
          //   return sessionLength;
       
          // }
          if(prev<=0 && onBreak ==="break"){
            playAudio();
            setOnBreak("session");
            console.log({onBreak})
            return breakLength;

          }
          else if(prev<=0 && onBreak ==="session"){
            playAudio();
            setOnBreak("break");
            console.log({onBreak})
            return sessionLength;
          }
          return prev-1;
        });
        nextDate += second;
      }
    },30) //update it every 30 milliseconds
    localStorage.clear();
    localStorage.setItem("interval-id", interval);
  }
  if(timerOn){
    clearInterval(localStorage.getItem("interval-id"));
  }
  setTimerOn(!timerOn);
  }

  const handleResetTime = ()=>{
 clearInterval(localStorage.getItem("interval-id"));
 setTimerOn(false);
  setDisplayTime(25*60);
  setBreakLength(5*60);
  setSessionLength(25*60);
  }

  return (
    <main className="container">
      <h1 className="title">Pomodoro Clock</h1>
      <section className="time-controls">
        <div id="break-label">
          <p>Break Length</p>
          <div className="button-container">
            <button id="break-decrement" onClick={()=> handleChangeBreakLength(-60,"break")}><i className="fa fa-arrow-circle-down"></i></button>
            <p id="break-length">{Math.floor(breakLength/60)}</p>
            <button id="break-increment" onClick={()=> handleChangeBreakLength(60,"break")}><i className="fa fa-arrow-circle-up"></i></button>
          </div>
        </div>
        <div id="session-label">
          <p>Session Length</p>
          <div className="button-container">
            <button id="session-decrement" onClick={()=> handleChangeBreakLength(-60,"session")} ><i className="fa fa-arrow-circle-down"></i></button>
            <p id="session-length">{Math.floor(sessionLength/60)}</p>
            <button id="session-increment" onClick={()=> handleChangeBreakLength(60,"session")}><i className="fa fa-arrow-circle-up"></i></button>
          </div>
        </div>
      </section>
      <section className="App">
        <div className="timer-container">
          <div id="timer-label">
            {onBreak ==="break" ? <h2>Session</h2> : <h2>Break</h2>}
          </div>
          <div id="time-left">
            <h1>{formatTime(displayTime)}</h1>
          </div>
       </div>
       <button className="control-buttons" onClick={controlTimer} id="start_stop">
         {timerOn? <span className="material-icons">
                pause_circle_filled
                </span>: <span className="material-icons">
                play_circle
                </span>
        }
       </button>
       <div className="reset-button">
         <button onClick={handleResetTime} id="reset">
           <span className="material-icons">
                restart_alt
          </span>
        </button>
       </div>
      </section>
    </main>
  );
}

export default App;
