import './App.css';
import {useState} from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [displayTime, setDisplayTime] = useState(25*60); // 25 minutes
  const [timerOn, settimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [audio, setAudio] = useState(new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"))

  const formatTime = (time)=>{
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes> 10 ? minutes : "0" + minutes}:${seconds> 10 ? seconds : "0" + seconds}` 
  }

  const playAudio = ()=>{
    audio.currentTime = 0;
    audio.play();
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
      if(!timerOn){
        setDisplayTime(prev => prev + number*60);
      }
    }
     
  }

  const controlTimer =()=>{
  let second = 1000;
  let date = new Date().getTime(); // get the current date in seconds
  let nextDate = new Date().getTime() + second;
  let onBreakVariable = onBreak;
  if(!timerOn){
    let interval = setInterval(()=>{
      date = new Date().getTime();
      if(date > nextDate){
        setDisplayTime(prev => {
          if(prev<=0 && onBreakVariable===false){
            playAudio();
            onBreakVariable = true;
            setOnBreak(true);
            return breakLength; // so that the display time is equal to the break time = 5 minutes
          }
          else if(prev <= 0 && onBreakVariable){
            onBreakVariable = false;
            setOnBreak(false);
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
  settimerOn(!timerOn);
  }

  const handleResetTime = ()=>{
  setDisplayTime(25*60);
  setBreakLength(5);
  setSessionLength(25);
  }

  return (
    <main className="container">
      <section className="time-controls">
        <div id="break-label">
          <p>Break Length</p>
          <div className="button-container">
            <button onClick={()=> handleChangeBreakLength(-1,"break")}><i className="fa fa-arrow-circle-down"></i></button>
            <p>{breakLength}</p>
            <button onClick={()=> handleChangeBreakLength(1,"break")}><i className="fa fa-arrow-circle-up"></i></button>
          </div>
        </div>
        <div id="section-label">
          <p>Session Length</p>
          <div className="button-container">
            <button onClick={()=> handleChangeBreakLength(-1,"session")} ><i className="fa fa-arrow-circle-down"></i></button>
            <p>{sessionLength}</p>
            <button onClick={()=> handleChangeBreakLength(1,"session")}><i className="fa fa-arrow-circle-up"></i></button>
          </div>
        </div>
      </section>
      <h1 className="title">Pomodoro Clock</h1>
      <section className="App">
       <h1>{formatTime(displayTime)}</h1>
       <button className="control-buttons" onClick={controlTimer}>
         {timerOn? <span className="material-icons">
                pause_circle_filled
                </span>: <span className="material-icons">
                play_circle
                </span>
        }
       </button>
       <div className="reset-button">
         <button onClick={handleResetTime}>
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
