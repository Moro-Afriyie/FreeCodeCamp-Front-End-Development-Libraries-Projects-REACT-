import './App.css';

const clips = ['A','B','C','D','E','F']
function App() {
  return (
    <main className="App">
      <h1 className="title">Drum Machine</h1>
      <div className="drum-container">
        <DrumPads clips={clips}/>
      </div>
    </main>
  );
}


const DrumPads = ({clips}) => {
  return ( 
      <div className="drum-pads">
  {clips.map(key => {
    return (
      <button key={key} className="btn">
      {key}
      <audio src=""></audio>
      </button>
  )})}  
      </div>
   );
}



export default App;
