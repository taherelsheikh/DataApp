import React, { Component } from "react";
import styled from "styled-components";
import Hero from "./Hero/Hero";
import Inputs from "./Inputs/Inputs";
import Footer from "./Footer/Footer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Hero />
        <Inputs />
        <Footer />
      </div>
    );
  }
}

export default App;
