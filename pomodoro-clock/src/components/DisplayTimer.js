const DisplayTimer = ({TimerLabel, displayTime})=>{

  const formatTime = (time)=>{
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes> 9 ? minutes : "0" + minutes}:${seconds>9 ? seconds : "0" + seconds}` 
  }
  return (
    <div className="timer-container">
      <div id="timer-label">
        {TimerLabel==="session"? <h2>Session</h2> : <h2>Break</h2>}
      </div>
      <div id="time-left-container">
        <h1 id="time-left">{formatTime(displayTime)}</h1>
      </div>
    </div>
  )
}
 
export default DisplayTimer;