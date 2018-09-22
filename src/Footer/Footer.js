import React, { Component } from 'react';
import 'bulma/css/bulma.css' ;


class Footer extends Component {

  render() {
    return (
      <footer className="footer">
        <div className="content has-text-centered has-text-weight-light">
          <p>
            <text className= "content has-text-normal">data engineering services</text> by
            <a href="https://www.linkedin.com/in/taherelsheikhgwu/" target="_blank"> Taher Elsheikh </a>
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer;
