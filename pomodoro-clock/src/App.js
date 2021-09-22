import './App.css';
import {useState} from 'react';

function App() {
  const [breakLength, setBreakLength] = useState();
  const [sessionLength, setSessionLength] = useState();
  const [displayTime, setDisplayTime] = useState(25*60); // 25 minutes

  const formatTime = (time)=>{
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes> 10 ? minutes : "0" + minutes}:${seconds> 10 ? seconds : "0" + seconds}` 
  }
 
  return (
    <main className="container">
      <h1 className="title">Pomodoro Clock</h1>
      <section className="App">
       <h1>{formatTime(displayTime)}</h1>
      </section>
    </main>
  );
}

export default App;
