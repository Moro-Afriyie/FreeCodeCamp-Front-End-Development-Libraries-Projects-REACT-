import './App.css';
import TimeControls from './TimeControls';
import DisplayTimer from './DisplayTimer';
import {useState, useEffect, useRef} from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5*60);
  const [sessionLength, setSessionLength] = useState(25*60);
  const [displayTime, setDisplayTime] = useState(25*60);
  const [timerOn, setTimerOn] = useState(true);
  const [TimerLabel, setTimerLabel] = useState("session");
  const myAudio = useRef();

  // used this to fix the audio bug and passed the test cases
  useEffect(()=>{
    if(displayTime===0){
       playAudio();
    }
  },[displayTime]);

  useEffect(()=>{
  if(!timerOn){
    let interval = setInterval(()=>{
        setDisplayTime((prev) => {
            if(prev===0 && TimerLabel ==="session"){
              setTimerLabel("break");
              return breakLength;
            }
            else if(prev===0 && TimerLabel !=="session"){
              setTimerLabel("session");
              return sessionLength;
            }
          return prev-1;
         });
    },1000);
    localStorage.clear();
    localStorage.setItem("interval-id", interval);
  }
  if(timerOn){
    clearInterval(localStorage.getItem("interval-id"));
  }

  return () => clearInterval(localStorage.getItem("interval-id"));

  },[breakLength, displayTime, TimerLabel, sessionLength, timerOn]);


  const playAudio = ()=>{
    if(myAudio.current !== null){
      myAudio.current.currentTime = 0;
      myAudio.current.play();
    }
  }
  
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
  myAudio.current.load();
  }

  return (
    <main>
      <h1 className="title">Pomodoro Clock</h1>
      <section className="container">
        <section className="time-controls">
          <TimeControls 
            timeLength={breakLength}
            handleChangeBreakLength = {handleChangeBreakLength}
            type="break"
            label="Break Length"
          />
          <TimeControls 
            timeLength={sessionLength}
            handleChangeBreakLength = {handleChangeBreakLength}
            type="session"
            label="Session Length"
          />
        </section>
        <section className="App">
          {/* <div className="timer-container">
            <div id="timer-label">
              {TimerLabel==="session"? <h2>Session</h2> : <h2>Break</h2>}
            </div>
            <div id="time-left-container">
              <h1 id="time-left">{formatTime(displayTime)}</h1>
            </div>
          </div> */}
          <DisplayTimer 
          TimerLabel={TimerLabel}
          displayTime = {displayTime}
          />
          <section className="controls-container">
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
        </section>
        <audio
        id="beep"
        src ="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        type="audio"
        ref={myAudio}
        >
        </audio>
      </section>
      </section>
    </main>
  );
}


export default App;
