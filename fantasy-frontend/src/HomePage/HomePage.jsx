import React from 'react';

import { userService } from '../_services';
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

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: []
        };
    }

    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            users: { loading: true }
        });
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { user, users } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
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
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

export { HomePage };