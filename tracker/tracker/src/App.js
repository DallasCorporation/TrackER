import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import { enquireScreen } from 'enquire-js';
import "./index.css"
import DashboardRoutes from './Consumer/DashboardRoutes';
import { connect } from 'react-redux';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location = {} } = typeof window !== 'undefined' ? window : {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: !location.port,
    };
  }

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    if (location.port) {
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 100);
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <DashboardRoutes />
        </BrowserRouter>
      </div>
    );
  }
}


export default App;