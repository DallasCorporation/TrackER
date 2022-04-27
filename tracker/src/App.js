import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { enquireScreen } from 'enquire-js';
import Home from './Home';

import {
  Nav30DataSource,
  Footer10DataSource,
} from './Home/data.source.js';
import Header3 from './Home/Nav3';
import Footer from './Home/Footer1';
import Service from './Service';

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
      this.state.show && 
      <BrowserRouter>
        <Header3
          id="Nav3_0"
          key="Nav3_0"
          dataSource={Nav30DataSource}
          isMobile={this.state.isMobile}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/About" element={<Home />} />
        </Routes>

        <Footer
          id="Footer1_0"
          key="Footer1_0"
          dataSource={Footer10DataSource}
          isMobile={this.state.isMobile}
        />
      </BrowserRouter>
    );
  }
}

export default App;