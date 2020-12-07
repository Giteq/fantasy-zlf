import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import ResultsTable from '../componenets/ResultsTable';
  import {TransfersTable, TransferSinglePlayer} from '../componenets/TransfersTable'
  import {ResultsPitch} from '../componenets/Pitch'


const routes = [
{
    path: "/results",
    component: ResultsTable
},
{
    path: "/pitch",
    component: ResultsPitch
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
  export function RouteWithSubRoutes(route) {
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

class HomePage extends React.Component {
    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <Router>
                    <div className="container">
                    <nav className="menu">
                    <ul className="main-menu">
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

                        <div className="animation start-home"></div>
                    </nav>
                    </div>
                </Router>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

export { HomePage };