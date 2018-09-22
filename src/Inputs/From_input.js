import React, { Component } from "react";
import styled from "styled-components";
import Radio_buttons from "./Radio_buttons.js";
import "./From_input.css";
import "bulma/css/bulma.css";

class From_inputs extends Component {
  constructor() {
    super();
    this.state = {
      hiveButtonStatus: "button has-text-weight-light is-medium is-link",
      verticaButtonStatus:
        "button has-text-weight-light is-medium is-link is-outlined",
      csvButtonStatus:
        "button has-text-weight-light is-medium is-link is-outlined",
      fromDataBase: "hive",
      fromSchemaName: "",
      inputSchemaClass: "input is-link",
      fromTableName: "",
      inputTableClass: "input is-link",
      fromWhereClause: "",
      csvName: null,
      csvSize: null,
      csvType: null,
      emptyCsv: ""
    };
    this.handleDatabaseClick = this.handleDatabaseClick.bind(this);
    this.handleEmptySchema = this.handleEmptySchema.bind(this);
    this.handleEmptyTable = this.handleEmptyTable.bind(this);
    this.handleEmptyToSmthSchema = this.handleEmptyToSmthSchema.bind(this);
    this.handleEmptyToSmthTable = this.handleEmptyToSmthTable.bind(this);
    this.cancelFromInputs = this.cancelFromInputs.bind(this);
    this.handleEmptyCsv = this.handleEmptyCsv.bind(this);
  }

  passInputData() {
    let data = {
      fromDataBase: this.state.fromDataBase,
      fromSchemaName: this.state.fromSchemaName,
      fromTableName: this.state.fromTableName,
      fromWhereClause: this.state.fromWhereClause,
      csvName: this.state.csvName,
      csvSize: this.state.csvSize,
      csvType: this.state.csvType
    };
    return(data);
  }

  handleDatabaseClick(databaseName) {
    if (databaseName === "hive") {
      this.setState({ fromDataBase: "hive" });
      this.setState({
        hiveButtonStatus: "button has-text-weight-light is-medium is-link"
      });
      this.setState({
        verticaButtonStatus:
          "button has-text-weight-light is-medium is-link is-outlined"
      });
      this.setState({
        csvButtonStatus:
          "button has-text-weight-light is-medium is-link is-outlined"
      });
    } else if (databaseName === "vertica") {
      this.setState({ fromDataBase: "vertica" });
      this.setState({
        hiveButtonStatus:
          "button has-text-weight-light is-medium is-link is-outlined"
      });
      this.setState({
        verticaButtonStatus: "button has-text-weight-light is-medium is-link"
      });
      this.setState({
        csvButtonStatus:
          "button has-text-weight-light is-medium is-link is-outlined"
      });
    } else if (databaseName === "csv") {
      this.setState({ fromDataBase: "csv" });
      this.setState({
        hiveButtonStatus:
          "button has-text-weight-light is-medium is-link is-outlined"
      });
      this.setState({
        verticaButtonStatus:
          "button has-text-weight-light is-medium is-link is-outlined"
      });
      this.setState({
        csvButtonStatus: "button has-text-weight-light is-medium is-link"
      });
    }
  }

  ////// Cancel Button //////
  cancelFromInputs() {
    this.setState({ inputSchemaClass: "input is-link" });
    this.setState({ inputTableClass: "input is-link" });
    this.setState({ fromSchemaName: "" });
    this.setState({ fromTableName: "" });
    this.setState({ fromWhereClause: "" });
    this.setState({ csvName: null });
    this.setState({ csvSize: null });
    this.setState({ csvType: null });
    this.setState({emptyCsv: ""})
  }
  //////////////////////////

  ////// Danger msg when empty //////
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
  } ////////////////////////////////////////

  ////// Change input class when Empty //////
  // Schema Input

  handleEmptySchema() {
    let schemaName = this.state.fromSchemaName.replace(/\s/g, "");
    let fromDataBase = this.state.fromDataBase
    let csvName = this.state.csvName

    if (fromDataBase === 'csv') {
      if (csvName != null) {
        this.setState({emptyCsv: false})
        return true;
      } else if (csvName == null) {
        this.setState({emptyCsv: true})
        return false;
      }
    } else {
      if (schemaName === "") {
        this.setState({ inputSchemaClass: "input is-danger" });
        return false;
      } else if (schemaName !== "") {
        return true;
      }
    }
  }

  handleEmptyCsv() {
    if (this.state.emptyCsv) {
      return (
        <div className="box">
        <span className=" has-text-weight-light has-text-danger ">no file was uploaded</span>
        </div>
      )
    }
    }


  // Table Input
  handleEmptyTable() {
    let schemaName = this.state.fromTableName.replace(/\s/g, "");
    let fromDataBase = this.state.fromDataBase
    if (schemaName === "" && fromDataBase !== "csv") {
      this.setState({ inputTableClass: "input is-danger" });
      return false;
    }
    else {
      return true;
    }
  }
  ////////////////////////////////////////

  ////// input values changes from empty to smth onChange //////
  handleEmptyToSmthSchema(value) {
    if (value.length > 0) {
      this.setState({ inputSchemaClass: "input is-link" });
      // this.props.passSchemaFromClass("input is-link")
    }
  }

  handleEmptyToSmthTable(value) {
    if (value.length > 0) {
      this.setState({ inputTableClass: "input is-link" });
    }
  }

  ////////////////////////////////////////

  ////// Pass Input data to states //////
  // pass data, SchemaName, to state
  handleSchemaName(event) {
    this.setState({ fromSchemaName: event.target.value });
    this.handleEmptyToSmthSchema(event.target.value);
  }

  // pass data, table name, to state
  handleTableName(event) {
    this.setState({ fromTableName: event.target.value });
    this.handleEmptyToSmthTable(event.target.value);
  }

  // pass data, where clause, to state
  handleWhere(event) {
    this.setState({ fromWhereClause: event.target.value });
  } ////////////////////////////////////////

handleCSV(file) {
  // console.log(e.target.files[0].name)
  // console.log(e.target.files[0].size)
  // console.log(e.target.value)
  // console.log(e.target.files[0].data)
  // console.log(e.target.result)
  // console.log(e.target.files[0])
}

handleCSVupload(e) {
  let size = e.target.files[0].size
  let type = e.target.files[0].type


  // only files less than 50MB are uploaded
  if (size < 50000 && type === "text/csv") {
    // handles long text files
    this.setState({emptyCsv:false})
    this.setState({csvName: e.target.files[0].name.substr(0, 30)})
    this.setState({csvType: e.target.files[0].type})
    this.setState({csvSize: e.target.files[0].size})
    document.getElementById("formCSV").submit();
  }
}

fileName() {
  if (this.state.csvName !== null) {
    let label = '\xa0\xa0' + this.state.csvName;
    return  (
      <div className="box ">
      <text  className=" tag has-text-weight-light is-size-9 is-white is-medium">{label}</text>
      </div>
    )
  }
}

testingbutton() {
  return <input type="submit"/>
}

  // either csv page or inputs page
  csvHandlePage() {
    if (this.state.fromDataBase === "csv") {
      return (
        <div id="csvImport" className="box ">
          <div className="file is-light  ">
            <label className="file-label">
             <form method="POST" id="formCSV" encType="multipart/form-data" action={'http://127.0.0.1:5000/upload'}>
              <input className="file-input" type="file" name="csv" accept=".csv" onChange={(e)=>{this.handleCSVupload(e)}}/>
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fa fa-upload" aria-hidden="true"/>
                </span>
                <span className="file-label has-text-weight-light is-size-8">choose a file…
                </span>
              </span>
              </form>
            </label>
          </div>
          {this.handleEmptyCsv()}

          {this.fileName()}
        </div>
      );
    } else {
      return (
        <div>
          {/* schema name input */}
          <div className="field">
            <label className="label has-text-weight-normal">
              schema name
              <span className="icon">
                <i className="fa fa-arrow-circle-right" aria-hidden="true" />
              </span>
            </label>
            <div className="control">
              <input
                className={this.state.inputSchemaClass}
                type="text"
                placeholder="sbg_published"
                value={this.state.fromSchemaName}
                onChange={event => {
                  this.handleSchemaName(event);
                }}
              />
              {this.dangerMsgEmptySchema()}
            </div>
          </div>

          {/* table name input */}

          <div className="field">
            <label className="label has-text-weight-normal">
              table name
              <span className="icon">
                <i className="fa fa-arrow-circle-right" aria-hidden="true" />
              </span>
            </label>
            <div className="control">
              <input
                className={this.state.inputTableClass}
                type="text"
                placeholder="car_payroll"
                value={this.state.fromTableName}
                onChange={event => {
                  this.handleTableName(event);
                }}
              />
              {this.dangerMsgEmptyTable()}
            </div>
          </div>

          {/* where clause input */}

          <div className="field">
            <label className="label has-text-weight-normal">
              where clause
              <text className="has-text-grey	"> (optional)</text>
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="signupdate >= '2018-01-01' and signupdate <= '2018-02-01'"
                value={this.state.fromWhereClause}
                onChange={event => {
                  this.handleWhere(event);
                }}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="column is-4 is-offset-1">
        {/* database input */}

        <div className="field">
          from
          <span className="icon">
            <i className="fa fa-arrow-circle-right" aria-hidden="true" />
          </span>
          <div className="field has-addons">
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
                className={this.state.csvButtonStatus}
                onClick={() => {
                  this.handleDatabaseClick("csv");
                }}
              >
                <span>CSV</span>
              </a>
            </p>
          </div>
        </div>

        {this.csvHandlePage()}
        <div />
      </div>
    );
  }
}

export default From_inputs;
