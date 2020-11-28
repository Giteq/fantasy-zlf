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
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage/Login';

// export default class App extends Component {
  
//   render() {
//     return (
//       <Router>
//         <div class="container">
//           <nav class="menu">
//           <ul class="main-menu">
//             <li>
//                 <Link to="/pitch" >Wyniki</Link>
//               </li>
//               <li>
//                 <Link to="/results" >Gracze</Link>
//               </li>
//               <li>
//                 <Link to="/transfers" >Transfery</Link>
//               </li>

//             </ul>

//             <Switch>
//               {routes.map((route, i) => (
//                 <RouteWithSubRoutes key={i} {...route} />
//               ))}
//             </Switch>

//             <div class="animation start-home"></div>
//           </nav>
//         </div>
//       </Router>

//     );
//   }
// }

export default class App extends React.Component {
  render() {
      return (
          <div className="jumbotron">
              <div className="container">
                  <div className="col-sm-8 col-sm-offset-2">
                      <Router>
                          <div>
                              <PrivateRoute exact path="/" component={HomePage} />
                              <Route path="/login" component={LoginPage} />
                          </div>
                      </Router>
                  </div>
              </div>
          </div>
      );
  }
}

export { App }; 
