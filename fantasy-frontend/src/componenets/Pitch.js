import React, { Component } from 'react';
import styles from './Pitch.css'
import PitchImg from './images/futsalfield.jpg'
import ShirtImg from './images/koszulka.jpg'
import './ResultsTable.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ResultsTable from './ResultsTable';
import {TransfersTable, TransferSinglePlayer} from './TransfersTable'

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shirtStyle: {
        width: "100%",
        height: "10%",
        backgroundImage:  `url(${ShirtImg})`
      },
      divPlayer: {
        position: 'absolute',
        width:'55px',
        height:'400px',
        textAlign: 'center'
      },
      caption: {
        display: 'block'
      }
    }
  }
  
  getName() {
    return 'Żiba'
  }

  getScore() {
    return 5
  }

   render() {
     this.state.divPlayer.left = this.props.left;
     this.state.divPlayer.top = this.props.top;
       return (
        <div style={this.state.divPlayer}>
            <span class={styles.caption}>{this.getName()}</span>
           <img src={ ShirtImg } style={this.state.shirtStyle}></img>
           <span class={styles.caption}>{this.getScore()}</span>
        </div>
       )
   }
}

class Pitch extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      divPitch: {
        position: 'relative',
        height: '450px',
        width: '250px',
      },
      pitchStyle: {
        width: "100%",
        height: "100%",
        backgroundImage:  `url(${PitchImg})`
      },
    }
  }

  renderPlayer(position) {
    if (position === 'lo') {
      var left = "30%";
      var top = "-160%";
    }
    if (position === 'ro') {
      var left = "100%";
      var top = "-160%";
    }
    if (position === 'gk') {
      var left = "65%";
      var top = "-220%";
    }
    if (position === 'ln') {
      var left = "30%";
      var top = "-80%";
    }
    if (position === 'pn') {
      var left = "100%";
      var top = "-80%";
    }
    if (position === 'bench') {
      var left = "65%";
      var top = "0%";
    }

    return (<Player left={left} top={top}></Player>);
  }

  getTotalScore() {
    return 25
  }
  
  getPlayers() {

  }

   render() {
  var tmp = {
    position: 'absolute',
    height: '200px',
    width: '150px',
  }

       return (
        <div style={this.state.divPitch}>
          Wynik: {this.getTotalScore()}
           <img src={ PitchImg } style={this.state.pitchStyle}></img>
           <div style={tmp}>
              {this.renderPlayer('lo')}
              {this.renderPlayer('ro')}
              {this.renderPlayer('gk')}
              {this.renderPlayer('pn')}
              {this.renderPlayer('ln')}
              {this.renderPlayer('bench')}
            </div>
        </div>
       )
   }

}

var divParent = {
  'height': '100vh', /* Magic here */
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center'
};


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


export default class Results extends Component {
  
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
