import React, { Component } from "react";
import "bulma/css/bulma.css";
import taking_a_break from "../taking_a_break.svg";
import "./Hero.css";

class Hero extends Component {
  render() {
    return (
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container">
          <div id="qbo_logo_div">
          </div>
          <img id="qbo_logo" src={taking_a_break} alt="Italian Trulli" />
            <h1 className="title">
            <text className="has-text-grey-dark	">Data Engineering Services</text></h1>
            <h2 id='madeEasy' className="subtitle">made easy</h2>
          </div>
        </div>
      </section>

    );
  }
}

export default Hero;
