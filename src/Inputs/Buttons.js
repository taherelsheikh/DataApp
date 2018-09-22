import To_input from "./To_input.js";
import React, { Component } from "react";
import styled from "styled-components";
import "bulma/css/bulma.css";

class Buttons extends Component {
  render() {
    return (
      <div className="columns">
        {/* email & slack inputs */}
        <div className="column is-4 is-offset-6 ">
          <p className="buttons">
            <a className="button is-medium is-outlined  is-rounded has-text-weight-light"
            onClick={()=>{this.props.cancel()}}>
              Cancel
            </a>
            <a className="button is-medium is-link is-outlined is-rounded has-text-weight-light	"
            onClick={()=>{this.props.submit()}}>
              Submit
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Buttons;
