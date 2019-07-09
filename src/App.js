// import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Layout from './components/VerticalLayout';
// import AuthorizeRoute from './components/AuthorizeRoute';

// import './App.css';
// import ImportFile from './containers/ImportFile';
// import Login from './components/Login';
// import Dashboard from './containers/Dashboard';
// import Field from './containers/Field';
// import Contact from './containers/Contact';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Layout>
//           <Route exact path="/" component={Dashboard} />
//           <Route exact path="/login" component={Login} />
//           <AuthorizeRoute exact path="/files" component={ImportFile} />
//           <AuthorizeRoute exact path="/fields" component={Field} />
//           <AuthorizeRoute exact path="/contacts" component={Contact} />
//         </Layout>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from 'components/LayoutBase';

import routes from 'config/routes';
import menus from 'config/menus';
import './App.css';

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
