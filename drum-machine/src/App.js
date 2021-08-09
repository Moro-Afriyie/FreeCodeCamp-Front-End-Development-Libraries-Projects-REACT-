import './App.css';

function App() {
  return (
    <main className="App">
      <h1 className="title">Drum Machine</h1>
      <div className="drum-container">
        <drumPads />
      </div>
    </main>
  );
}
const drumPads = () => {
  return ( 
      <div className="drum-pads">
          <h1>Drum pads </h1>
      </div>
   );
}



export default App;
