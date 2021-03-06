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
    id: 'Chord-S',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Chord-D',
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
  
  useEffect(()=>{
    if(toggle){
      setBanks(bankTwo);
      
    }
    else{
      setBanks(bankOne);
    }
  },[toggle])

  const handleVolumeChange=(e)=>{
    setVolume(e.target.value);
  }
  const handleToggle =(e)=>{
    setToggle(e.target.checked);
    if(e.target.checked){
      setaudioID("Smooth Piano Kit");
    }
    else{
      setaudioID("Heater Kit");
    }
  }
  return (
    <main className="App">
      <h1 className="title">Drum Machine</h1>
      <div id="drum-machine">
        <div className="drum-container">
          {banks.map((clip)=>{
              return <DrumPads 
              key={clip.id} 
              clip={clip}
              volume={volume}
              setaudioID={setaudioID}/>
          })}
        </div>
        <div className="controls">
      
            <p id="display">{audioID}</p>
         
          <div className="volume">
            {volume>0? <span className="material-icons md-24">
                volume_up
                </span> : <span className="material-icons md-24">
                volume_off
                </span>
            }
            <label className="custom-range-slider range">
                <input
                onChange={handleVolumeChange}
                type="range"
                step="0.01" 
                min="0" 
                max="1" 
                value={volume} />
            </label>
            <p>{Math.floor(volume*100)}</p>
          </div>
          <div className="bank-container">
            <h3>Bank</h3>
            <label className="toggle">
              <input type="checkbox" checked={toggle} onChange={handleToggle} id="cToggle"/>
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </main>
  );
}


const DrumPads = ({clip, volume, setaudioID}) => {
 
  const [active, setActive]= useState(false);
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
    setActive(true);
    setTimeout(()=>{
      setActive(false);
    }, 200);
    sound.currentTime = 0;
    sound.play();
    setaudioID(clip.id.replace(/-/g, ' ')); // display the sound being played
   
    
  }

  return ( 
     
          <button id={clip.id}
          key={clip.keyCode}
          className={active ? "drum-pad btn active" : "drum-pad btn"}
          onClick={handlePlaySound}
          >
            <audio 
            className="clip"
            id={clip.keyTrigger} 
            src={clip.url}>
            </audio>
          {clip.keyTrigger}
          </button>
      
   );
}



export default App;
