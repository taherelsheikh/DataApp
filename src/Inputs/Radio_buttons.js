import React, { Component } from "react";
import styled from "styled-components";
import "bulma/css/bulma.css";

class Radio_buttons extends Component {
  constructor() {
    super();
    this.state = {
      job_type: "drop & create",
      dropChecked: "checked",
      insertChecked: "",
      truncateChecked: ""
    };
  }

  handleJobType(job_type) {
    this.setState({ job_type: job_type });
    if (job_type === "drop & create") {
      this.setState({dropChecked: "checked"})
      this.setState({insertChecked: ""})
      this.setState({truncateChecked: ""})
    } else if (job_type === "insert into") {
      this.setState({dropChecked: ""})
      this.setState({insertChecked: "checked"})
      this.setState({truncateChecked: ""})
    } else if (job_type === "truncate & load") {
      this.setState({dropChecked: ""})
      this.setState({insertChecked: ""})
      this.setState({truncateChecked: "checked"})
    }
  }

  passInputData() {
    return(this.state.job_type);
  }

  render() {
    return (
      <div className="columns">
        <div className="column is-4 is-offset-6 ">

          {/* drop & create */}
          <label className="radio has-text-weight-light">
            <input
              type="radio"
              name="foobar"
              onChange={(event) => {this.handleJobType("drop & create")}}
              checked={this.state.dropChecked}
            />
            &#8203; drop & create &#8203;
          </label>

          {/* insert into */}
          <label className="radio has-text-weight-light">
            <input
              type="radio"
              name="foobar"
              onChange={(event) => {this.handleJobType("insert into")}}
              checked={this.state.insertChecked}
            />
            &#8203; insert into &#8203;
          </label>

          {/* truncate & load */}
          <label className="radio has-text-weight-light">
           <input
             type="radio"
             name="foobar"
             onChange={(event) => {this.handleJobType("truncate & load")}}
             checked={this.state.truncateChecked}
           />
            &#8203; truncate & load
          </label>
        </div>
      </div>
    );
  }
}

export default Radio_buttons;
