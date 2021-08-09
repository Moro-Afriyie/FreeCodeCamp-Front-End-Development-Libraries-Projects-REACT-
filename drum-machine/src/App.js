import './App.css';

function App() {
  return (
    <main className="App">
      <h1 className="title">Drum Machine</h1>
      <div className="drum-container">
        <DrumPads />
      </div>
    </main>
  );
}
const DrumPads = () => {
  return ( 
      <div className="drum-pads">
          <button className="btn">
            click me
            <audio src=""></audio>
          </button>
      </div>
   );
}



export default App;
