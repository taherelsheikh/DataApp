import React, { Component } from "react";
import "./SuccessNotification.css";
import "bulma/css/bulma.css";
import "animate.css/animate.min.css";
// fadeInLeftBig
// fadeOutLeftBig
// flipInY
// flipOutY

class SuccessNotification extends Component {
  constructor() {
    super()
    this.state = {
      notificationStatus: "animated fadeInLeftBig",
      notificationOn: 1
    }
    this.handleNotificationOn = this.handleNotificationOn.bind(this)
    this.notificationTimer = this.notificationTimer.bind(this)

  }

  notificationTimer(number) {
    if (number === 1) {
      setTimeout(() => {this.setState({notificationOn: 0}); }, 4000)
    } else if (number === 2) {
      setTimeout(() => {this.setState({notificationOn: 2}); }, 250)
    } else if (number === 0 ) {
      this.props.notificationStatus()
    }
  }

  handleNotificationOn() {
    if (this.state.notificationOn === 1) {
      this.notificationTimer(1)
      return (
      <div className="animated jello">
        <div className="container">
          <div className="notification is-success has-text-weight-normal">
            <div className="columns">
              <i
                className="fa fa-check-circle fa-3x"
                aria-hidden="true"
                id="SuccessNotificationIcon"
              />
              <div className="column">
                <text className="has-text-weight-semibold"> Success!</text>
                <div>Your job is now being processed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
       )
    } else if (this.state.notificationOn === 0) {
      this.notificationTimer(2)
      // setTimeout(() => {this.setState({notificationOn: 2}); }, 250)
      return (
      <div className="animated zoomOut">
        <div className="container">
          <div className="notification is-success has-text-weight-normal">
            <div className="columns">
              <i
                className="fa fa-check-circle fa-3x"
                aria-hidden="true"
                id="SuccessNotificationIcon"
              />
              <div className="column">
                <text className="has-text-weight-semibold"> Success!</text>
                <div>Your job is now being processed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
       )
    } else if (this.state.notificationOn === 2) {
      this.notificationTimer(0)
    }
  }



  render() {
    return (
      <div className="field" id="SuccessNotification">
      {this.handleNotificationOn()}
      </div>
    );
  }
}

export default SuccessNotification;
