import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import routes from 'config/routes';
import menus from 'config/menus';

import 'antd/dist/antd.css';
import './App.css';

import Layout from 'components/LayoutBase';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout menus={menus}>
          {routes.map(route => (
            <Route key={route.path} exact path={route.path} component={route.component} />
          ))}
        </Layout>
      </Router>
    );
  }
}

export default App;
