import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ResultsTable from '../componenets/ResultsTable';
import {TransfersTable, TransferSinglePlayer} from '../componenets/TransfersTable'
import {Pitch} from '../componenets/Pitch'


const routes = [
  {
    path: "/results",
    component: ResultsTable
  },
  {
    path: "/pitch",
    component: Pitch
  },
  {
    path: "/transfers",
    component: TransfersTable
  },
  {
    path: "/transferPlayer",
    component: TransferSinglePlayer
  },
];


// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}


export default class App extends Component {
  
  render() {
    return (
      <Router>
        <div class="container">
          <nav class="menu">
          <ul class="main-menu">
            <li>
                <Link to="/pitch" >Wyniki</Link>
              </li>
              <li>
                <Link to="/results" >Gracze</Link>
              </li>
              <li>
                <Link to="/transfers" >Transfery</Link>
              </li>

            </ul>

            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>

            <div class="animation start-home"></div>
          </nav>
        </div>
      </Router>

    );
  }
}
