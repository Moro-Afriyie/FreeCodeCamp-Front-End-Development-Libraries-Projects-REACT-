import './App.css';
import {useState} from 'react';

function App() {
  const [breakLength, setBreakLength] = useState();
  const [sessionLength, setSessionLength] = useState();
  const [displayTime, setDisplayTime] = useState(25*60);



  return (
    <main className="container">
      <h1 className="title">Pomodoro Clock</h1>
      <section className="App">
      
      </section>
    </main>
  );
}

export default App;
