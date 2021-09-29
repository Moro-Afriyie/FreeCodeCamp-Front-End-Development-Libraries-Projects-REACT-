const TimeControls = (props) => {
    const {timeLength, handleChangeBreakLength,type,label} = props;
return (
  <div id={`${type}-label`}>
      <p>{label}</p>
        <div className="button-container">
            <button id={`${type}-decrement`} onClick={()=> handleChangeBreakLength(-60,type)}><i className="fa fa-arrow-circle-down"></i></button>
            <p id={`${type}-length`}>{Math.floor(timeLength/60)}</p>
            <button id={`${type}-increment`} onClick={()=> handleChangeBreakLength(60,type)}><i className="fa fa-arrow-circle-up"></i></button>
        </div>
  </div>
)
}
 
export default TimeControls;