import './App.css';
import {useState, useEffect, useRef} from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5*60);
  const [sessionLength, setSessionLength] = useState(25*60);
  const [displayTime, setDisplayTime] = useState(25*60);
  const [timerOn, setTimerOn] = useState(true);
  const [TimerLabel, setTimerLabel] = useState("session");
  const myAudio = useRef();
  // const context = new AudioContext();

//   const sleep = (milliseconds) => {
//   return new Promise(resolve => setTimeout(resolve, milliseconds))
// }

  useEffect(()=>{
  let second = 1000;
  let date = new Date().getTime(); // get the current date in seconds
  let nextDate = new Date().getTime() + second;
  if(!timerOn){
    let interval = setInterval(()=>{
      date = new Date().getTime();
      if(date > nextDate){
        setDisplayTime((prev) => {
          if(prev===0){
            playAudio();
        
            if(TimerLabel ==="session"){
              setTimerLabel("break");
              return breakLength;

            }
            else if(TimerLabel !=="session"){
              setTimerLabel("session");
              return sessionLength;
            }
          }
          
          return prev-1;
         });
        nextDate += second;
      }
    },1000);
    localStorage.clear();
    localStorage.setItem("interval-id", interval);
  }
  if(timerOn){
    clearInterval(localStorage.getItem("interval-id"));
  }

  return () => clearInterval(localStorage.getItem("interval-id"));

  },[breakLength, displayTime, TimerLabel, sessionLength, timerOn]);


  const formatTime = (time)=>{
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes> 9 ? minutes : "0" + minutes}:${seconds>9 ? seconds : "0" + seconds}` 
  }

  const playAudio = ()=>{
    // let audio = document.getElementById("beep");
    // audio.currentTime = 0;
    // audio.play();
    if(myAudio.current !== null){
      myAudio.current.currentTime = 0;
      myAudio.current.play();
    }
  }
  // const pauseAudio =()=>{
  //   let audio = document.getElementById("beep");
  //   audio.currentTime = 0;
  //   audio.pause();
  // }
 
  const handleChangeBreakLength = (number, type)=>{
    if(type==="break"){
      if(breakLength<=60 && number < 0){
        return;
      }
      else if (breakLength>59*60) {
        return;
      }
      setBreakLength(prev => prev + number);
     
    }
    else{
      if(sessionLength<=60 && number < 0){
        return;
      }
      else if (sessionLength>59*60) {
        return;
      }
      setSessionLength(prev => prev + number);
      if(timerOn){
        setDisplayTime(prev => prev + number);
      }
    }
     
  }

  const controlTimer =()=>{
  setTimerOn(!timerOn);
  }

  const handleResetTime = ()=>{
  clearInterval(localStorage.getItem("interval-id"));
  setTimerOn(true);
  setDisplayTime(25*60);
  setBreakLength(5*60);
  setSessionLength(25*60);
  setTimerLabel("session");
  myAudio.current.pause();
  myAudio.current.currentTime = 0;
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
            {/* {onBreak ==="break" ? <h2>Session</h2> : <h2>Break</h2>} */}
            {TimerLabel==="session"? <h2>Session</h2> : <h2>Break</h2>}
          </div>
          <div id="time-left-container">
            <h1 id="time-left">{formatTime(displayTime)}</h1>
          </div>
       </div>
       <button className="control-buttons" onClick={controlTimer} id="start_stop">
         {timerOn? <span className="material-icons">
                play_circle
                </span> : <span className="material-icons">
                pause_circle_filled
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
       <audio
       id="beep"
       src ="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
       type="audio"
       ref={myAudio}
       >
       </audio>
      </section>
    </main>
  );
}

export default App;
