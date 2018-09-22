import React, { Component } from "react";
import styled from "styled-components";
import "bulma/css/bulma.css";

const Wrapper = styled.div`
  margin-bottom: 1px;
`;

class To_input extends Component {
  constructor() {
    super();
    this.state = {
      verticaButtonStatus: "button has-text-weight-light is-medium is-link",
      hiveButtonStatus:
        "button has-text-weight-light is-medium is-link is-outlined",
      toDataBase: "vertica",
      toSchemaName: "",
      inputSchemaClass: "input is-link",
      toTableName: "",
      inputTableClass: "input is-link",
      email: "",
      slack: ""
    };
    this.handleEmptySchema = this.handleEmptySchema.bind(this);
    this.handleEmptyTable = this.handleEmptyTable.bind(this);
    this.handleEmptyToSmthSchema = this.handleEmptyToSmthSchema.bind(this);
    this.handleEmptyToSmthTable = this.handleEmptyToSmthTable.bind(this);
    this.cancelToInputs = this.cancelToInputs.bind(this);
  }

  passInputData() {
    let data = {
      toDataBase: this.state.toDataBase,
      toSchemaName: this.state.toSchemaName,
      toTableName: this.state.toTableName,
      email: this.state.email,
      slack: this.state.slack
    };
    return(data);
  }

  ////// Cancel Button //////
  cancelToInputs() {
    this.setState({ toSchemaName: "" });
    this.setState({ toTableName: "" });
    this.setState({ inputTableClass: "input is-link" });
    this.setState({ inputSchemaClass: "input is-link" });
    this.setState({ email: "" });
    this.setState({ slack: "" });
  }
  //////////////////////////

  handleDatabaseClick(databaseName) {
    if (databaseName === "vertica") {
      this.setState({ toDataBase: "vertica" });
      this.setState({
        verticaButtonStatus: "button has-text-weight-light is-medium is-link"
      });
      this.setState({
        hiveButtonStatus:
          "button has-text-weight-light is-medium is-link is-outlined"
      });
    } else if (databaseName === "hive") {
      this.setState({ toDataBase: "hive" });
      this.setState({
        verticaButtonStatus:
          "button has-text-weight-light is-medium is-link is-outlined"
      });
      this.setState({
        hiveButtonStatus: "button has-text-weight-light is-medium is-link "
      });
    }
  }

  handleSchemaName(event) {
    this.setState({ toSchemaName: event.target.value });
    this.handleEmptyToSmthSchema(event.target.value);
  }

  handleTableName(event) {
    this.setState({ toTableName: event.target.value });
    this.handleEmptyToSmthTable(event.target.value);
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleSlack(event) {
    this.setState({ slack: event.target.value });
  }

  ////// Change input class when Empty ////////////////////////
  ////// Schema Input

  handleEmptySchema() {
    let schemaName = this.state.toSchemaName.replace(/\s/g, "");
    if (schemaName === "") {
      this.setState({ inputSchemaClass: "input is-danger" });
      return false;
    } else {
      return true;
    }
  }
  ////// Table Input

  handleEmptyTable() {
    let schemaName = this.state.toTableName.replace(/\s/g, "");
    if (schemaName === "") {
      this.setState({ inputTableClass: "input is-danger" });
      return false;
    } else {
      return true;
    }
  }

  ////////////////////////////////////////////////////////////

  ////// Danger msg when empty //////////////////////////////////////////////
  // Schema Input
  dangerMsgEmptySchema() {
    if (this.state.inputSchemaClass === "input is-danger") {
      return (
        <p className="has-text-weight-light has-text-danger">
          this field is required
        </p>
      );
    }
  }

  // Table Input
  dangerMsgEmptyTable() {
    if (this.state.inputTableClass === "input is-danger") {
      return (
        <p className="has-text-weight-light has-text-danger">
          this field is required
        </p>
      );
    }
  }

  ////////////////////////////////////////////////////////////////////////////

  ////// input values changes from empty to smth onChange //////
  handleEmptyToSmthSchema(value) {
    if (value.length > 0) {
      this.setState({ inputSchemaClass: "input is-link" });
    }
  }

  handleEmptyToSmthTable(value) {
    if (value.length > 0) {
      this.setState({ inputTableClass: "input is-link" });
    }
  }
  ////////////////////////////////////////}////////////////////////////////////

  render() {
    return (
      <div className="column is-4 is-offset-1">
        {/* database input ex VERTICA, HIVE, CSV */}
        <div className="field">
          to
          <div className="field has-addons">
            <p className="control">
              <a
                className={this.state.verticaButtonStatus}
                onClick={() => {
                  this.handleDatabaseClick("vertica");
                }}
              >
                <span>VERTICA</span>
              </a>
            </p>
            <p className="control">
              <a
                className={this.state.hiveButtonStatus}
                onClick={() => {
                  this.handleDatabaseClick("hive");
                }}
              >
                <span>HIVE</span>
              </a>
            </p>
          </div>
        </div>

        {/* schema name input */}
        <div className="field">
          <label className="label has-text-weight-normal">schema name</label>
          <div className="control">
            <input
              className={this.state.inputSchemaClass}
              type="text"
              placeholder="sbg_published"
              value={this.state.toSchemaName}
              onChange={event => {
                this.handleSchemaName(event);
              }}
            />
            {this.dangerMsgEmptySchema()}
          </div>
        </div>

        {/* table name input */}
        <div className="field">
          <label className="label has-text-weight-normal">table name</label>
          <div className="control">
            <input
              className={this.state.inputTableClass}
              type="text"
              placeholder="car_payroll"
              value={this.state.toTableName}
              onChange={event => {
                this.handleTableName(event);
              }}
            />
            {this.dangerMsgEmptyTable()}
          </div>
        </div>

        {/* email and slack input */}
        <div className="field">
          <label className="label has-text-weight-normal">
            Get a status update{" "}
            <text className="has-text-grey	">(optional)</text>
          </label>
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="email"
              placeholder="email"
              value={this.state.email}
              onChange={event => {
                this.handleEmail(event);
              }}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-envelope" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="field">
          <label className="label has-text-weight-normal" />
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="slack"
              placeholder="slack name"
              value={this.state.slack}
              onChange={event => {
                this.handleSlack(event);
              }}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-slack" aria-hidden="true" />
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default To_input;
