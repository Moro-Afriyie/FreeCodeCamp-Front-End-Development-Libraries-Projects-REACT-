import './App.css';
import {useState, useEffect} from 'react';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];


function App() {
  const [volume, setVolume] = useState(1);
  const [audioID, setaudioID] = useState("");
  const [toggle, setToggle] = useState(false);
  const [banks, setBanks] = useState(bankOne);
  // Smooth Piano Kit
  // Heater Kit

  useEffect(()=>{
    if(toggle){
      setBanks(bankTwo);
      setaudioID("Smooth Piano Kit");
    }
    else{
      setBanks(bankOne);
      setaudioID("Heater Kit");
    }
    console.log(banks);
  },[toggle])

  const handleVolumeChange=(e)=>{
    setVolume(e.target.value);
  }
  const handleToggle =(e)=>{
    setToggle(e.target.checked);
  }
  return (
    <main className="App">
      <h1 className="title">Drum Machine</h1>
      <div className="drum-container">
        {banks.map((clip)=>{
             return <DrumPads 
             key={clip.id} 
             clip={clip}
             volume={volume}
             setaudioID={setaudioID}/>
        })}
      </div>
      <div className="display-audio">
        <h3>{audioID}</h3>
        <h3>{`toggle: ${toggle}`}</h3>
      </div>
      <div className="volume-slider">
      <input
      onChange={handleVolumeChange}
       type="range"
       step="0.01" 
       min="0" 
       max="1" 
       value={volume} />
      </div>
      <label className="toggle">
        <input type="checkbox" checked={toggle} onChange={handleToggle} id="cToggle"/>
        <span className="slider"></span>
      </label>
    </main>
  );
}


const DrumPads = ({clip, volume, setaudioID}) => {
 

  // useEffect to handle keyPress
  useEffect(()=>{
    // add Keydown event listener
    document.addEventListener("keydown", handleKeyPress);
    // clean up function
    return ()=>{
      document.removeEventListener("keydown", handleKeyPress);
    }
  }, [])

  const handleKeyPress=(event)=>{
    if(event.keyCode === clip.keyCode){
      handlePlaySound();
    }
  }

  const handlePlaySound = () =>{
    const sound = document.getElementById(clip.keyTrigger);
    sound.volume = volume; // set the volume
    sound.currentTime = 0;
    sound.play();
    setaudioID(clip.id.replace(/-/g, ' ')); // display the sound being played
  }

  return ( 
      <div className="drum-pads">
          <button
          key={clip.keyCode}
          className="btn"
          id={clip.id}
          onClick={handlePlaySound}
          >
            <audio 
            id={clip.keyTrigger} 
            src={clip.url}>
            </audio>
          {clip.keyTrigger}
          </button>
      </div>
      
   );
}



export default App;
