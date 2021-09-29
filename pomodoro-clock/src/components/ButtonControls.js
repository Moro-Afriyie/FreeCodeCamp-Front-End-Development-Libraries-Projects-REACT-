const ButtonControls = (props)=>{
  const {controlTimer, timerOn, handleResetTime} = props;

  return (
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
  )
}
 
export default ButtonControls;