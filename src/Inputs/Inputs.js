import React, { Component } from "react";
import styled from "styled-components";
import From_input from "./From_input.js";
import To_input from "./To_input.js";
import Buttons from "./Buttons.js";
import Radio_buttons from "./Radio_buttons";
import SuccessNotification from "../SuccessNotification/SuccessNotification";
import axios from "axios";
import "bulma/css/bulma.css";

class Inputs extends Component {
  constructor() {
    super();
    this.state = {
      notificationStatus: false,
      successTo: 0,
      fromSchemaClass: "input is-link",
      fromData: "",
      toData: "",
      radioData: ""
    };
    this.handleNotification = this.handleNotification.bind(this);
  }

  handleNotification() {
    // if (this.state.notificationStatus === 1 && combineFromTo === 2) {
    if (this.state.notificationStatus) {
      return (
        <SuccessNotification
          notificationStatus={() => {
            this.setState({ notificationStatus: false });
          }}
        />
      );
    }
  }

  testingSubmit() {
    console.log(this.state.fromData)
    console.log(this.state.toData)
    console.log(this.state.radioData)
  }

  handleCancelButton() {
    this.refs.From_input.cancelFromInputs();
    this.refs.To_input.cancelToInputs();

    // // Pass data from child to parent
    // let fromData = this.refs.From_input.passInputData();
    // let toData = this.refs.To_input.passInputData();
    // let radioData = this.refs.radioButtons.passInputData()

  }

  handleSubmit() {
    // handles empty inputs and validate input is not empty
    let fromSchema = this.refs.From_input.handleEmptySchema();
    let fromTable = this.refs.From_input.handleEmptyTable();
    // handles empty inputs and validate input is not empty
    let toSchema = this.refs.To_input.handleEmptySchema();
    let toTable = this.refs.To_input.handleEmptyTable();

    // Pass data from child to parent
    let fromData = this.refs.From_input.passInputData();
    let toData = this.refs.To_input.passInputData();
    let radioData = this.refs.radioButtons.passInputData()

    // validation, if all is true show notification
    if (fromSchema && fromTable && toSchema && toTable) {
      this.setState({ notificationStatus: true });
      ////// pass data /////
      this.setState({ fromData: fromData });
      this.setState({ toData: toData });
      this.setState({ radioData: radioData });
      /////////////////////

      // let data = Object.assign({}, fromData, toData, radioData)

      axios.post('http://127.0.0.1:5000/csvs', {
        fromData,toData, radioData
        })



      this.handleCancelButton()
    }
  }

  // Pass success status when TO input is not empty
  successTo(schema, table) {
    if (schema === "input is-link" && table === "input is-link") {
      this.setState({ successTo: 1 });
    } else {
      this.setState({ successTo: 0 });
    }
  }

  passSchemaClass(fromSchemaClass) {
    this.setState({ fromSchemaClass: fromSchemaClass }, () => {
      console.log(this.state.fromSchemaClass);
    });

    // this.setState((fromSchemaClass) => ({fromSchemaClass : fromSchemaClass}) )
  }

  render() {
    return (
      <div className="question box">
        {/* notification  */}
        {this.handleNotification()}

        {/* from and to inputs  */}

        <div className="columns ">
          <From_input
            ref="From_input"
            passSchemaFromClass={fromSchemaClass => {
              this.passSchemaClass(fromSchemaClass);
            }}
          />
          <To_input
            ref="To_input"
            successTo={(schema, table) => {
              this.successTo(schema, table);
            }}
          />
        </div>
        <Radio_buttons
        ref="radioButtons"
        />

        {/* Buttons  */}

        <Buttons
          submit={() => {
            this.handleSubmit();
          }}
          cancel={() => {
            this.handleCancelButton();
          }}
        />
        {/*<a onClick={()=>{this.printFromData()}}>testing</a>*/}
      </div>
    );
  }
}

export default Inputs;
