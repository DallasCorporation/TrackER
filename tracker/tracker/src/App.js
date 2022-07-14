import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { enquireScreen } from 'enquire-js';
import Home from './Home';
import "./index.css"

import {
  Nav30DataSource,
  Footer10DataSource,
} from './Home/data.source.js';
import Header3 from './Home/Nav';
import Footer from './Home/Footer1';
import Service from './Service';
import Login from './Login/Login';
import DashboardRoutes from './Consumer/DashboardRoutes';
import { connect } from 'react-redux';
import VendorRoutes from './Vendor/VendorRoutes';



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
    const { logged, type } = this.props;
    return (
      <div>
        {this.state.show && logged ?
          type === "Vendor" ?
            <BrowserRouter>
              <VendorRoutes />
            </BrowserRouter> :
            <BrowserRouter>
              <DashboardRoutes />
            </BrowserRouter>
          :
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
              <Route path="/Access" element={<Login />} />
            </Routes>
            <Footer
              id="Footer1_0"
              key="Footer1_0"
              dataSource={Footer10DataSource}
              isMobile={this.state.isMobile}
            />
          </BrowserRouter>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { logged } = state.user
  const { type } = state.user.user
  return { logged, type }
}

export default connect(mapStateToProps)(App);