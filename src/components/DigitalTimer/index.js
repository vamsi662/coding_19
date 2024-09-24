import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {isTimerRunning: false, timer: 25, sec: 0, min: 25}
  }

  componentDidMount() {}

  timerInputChange = event => {
    this.setState({
      timer: parseInt(event.target.value),
      min: parseInt(event.target.value),
    })
  }

  decrement = () => {
    this.setState(prevState => ({
      timer: prevState.timer - 1,
      min: prevState.min - 1,
    }))
  }

  increment = () => {
    this.setState(prevState => ({
      timer: prevState.timer + 1,
      min: prevState.min + 1,
    }))
  }

  playOrPause = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.stopTimer = setInterval(this.tick(), 1000)
    } else {
      clearInterval(this.stopTimer)
      this.setState({isTimerRunning: false})
    }
  }

  tick = () => {
    const {isTimerRunning, min, sec} = this.state
    if (!isTimerRunning) {
      if (sec === 0) {
        this.setState(prevState => ({
          min: prevState.min - 1,
          sec: 59,
          isTimerRunning: true,
        }))
      } else {
        this.setState(prevState => ({
          sec: prevState.sec - 1,
          isTimerRunning: true,
        }))
      }
    } else {
      if (min === 0 && sec === 0) {
        clearInterval(this.stopTimer)
      } else if (sec === 0) {
        this.setState(prevState => ({min: prevState.min - 1, sec: 59}))
      } else {
        this.setState(prevState => ({sec: prevState.sec - 1}))
      }
    }
  }

  onReset = () => {
    const {min, sec, timer} = this.state
    if (min === 0 && sec === 0) {
      this.setState({isTimerRunning: false, timer: 25, sec: 0, min: 25})
    }
    clearInterval(this.stopTimer)
    this.setState({isTimerRunning: false, timer: 25, sec: 0, min: 25})
  }

  render() {
    const {timer, sec, isTimerRunning, min} = this.state
    let convertSecondToString = ''
    let convertMinutesToString = ''
    if (sec < 10) {
      convertSecondToString = '0'.concat(sec.toString())
    } else {
      convertSecondToString = sec.toString()
    }
    if (min < 10) {
      convertMinutesToString = '0'.concat(min.toString())
    } else {
      convertMinutesToString = min.toString()
    }
    const startAndPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startAndPauseText = isTimerRunning ? 'Pause' : 'Start'
    const startAndPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const timerStatus = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="main-con">
        <h1>Digital Timer</h1>
        <div className="timer-con">
          <div className="timer-display-con">
            <div className="timer">
              <h1 className="min-sec">
                {convertMinutesToString}:{convertSecondToString}
              </h1>
              <p className="timer-status">{timerStatus}</p>
            </div>
          </div>
          <div className="timer-buttons-con">
            <div className="start-reset-con">
              <div>
                <button
                  onClick={this.playOrPause}
                  className="play-pause-button"
                >
                  <img
                    src={startAndPauseImgUrl}
                    className="start-reset-image"
                    alt={startAndPauseAltText}
                  />
                </button>
              </div>
              <p className="play-reset-button-name">{startAndPauseText}</p>
              <div>
                <button onClick={this.onReset} className="play-pause-button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="start-reset-image"
                  />
                </button>
              </div>
              <p className="play-reset-button-name">Reset</p>
            </div>
            <p className="timer-title">Set Timer Limit</p>
            <div className="set-timer-con">
              <div>
                <button
                  className="decrement-timer-button"
                  onClick={this.decrement}
                >
                  -
                </button>
              </div>
              <input
                className="set-timer"
                type="text"
                value={timer}
                onChange={this.timerInputChange}
              />
              <div>
                <button
                  className="increment-timer-button"
                  onClick={this.increment}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
