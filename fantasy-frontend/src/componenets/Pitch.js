import React, { Component } from 'react';
import styles from '../styles/Pitch.css'
import PitchImg from './images/futsalfield.jpg'
import ShirtImg from './images/koszulka.jpg'
import '../styles/ResultsTable.css'
import RestApiMgr from '../Common'
import { authHeader } from '../_helpers/auth-header';


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

   render() {
     this.state.divPlayer.left = this.props.left;
     this.state.divPlayer.top = this.props.top;
       return (
        <div style={this.state.divPlayer}>
            <span class={styles.caption}>{this.props.name}</span>
           <img src={ ShirtImg } style={this.state.shirtStyle}></img>
           <span class={styles.caption}>{this.props.score}</span>
        </div>
       )
   }
}

export class Pitch extends RestApiMgr {
  
  constructor(props) {
    super(props);
    let user = JSON.parse(localStorage.getItem('user'));
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
      apiEndpoint: 'http://localhost:8000/users/' + user.username + '/info/',
      isLoading: true,
      renderedPositions: []
    }
  }

  renderPlayer(player) {
    if (player.position.position === 'defender') {
      console.log(this.state.renderedPositions.indexOf("defender"));
      if (this.state.renderedPositions.indexOf("defender") > -1){
        var left = "100%";
        var top = "-160%";
      }
      else{
        var left = "30%";
        var top = "-160%";
      }
    }
    if (player.position.position === 'goalkeeper') {
      var left = "65%";
      var top = "-220%";
    }
    if (player.position.position === 'forward') {
      if (this.state.renderedPositions.indexOf("forward") > -1){
        var left = "30%";
        var top = "-80%";
      }
      else{
        var left = "100%";
        var top = "-80%";
      }

    }
    if (player.position.position === 'bench') {
      var left = "65%";
      var top = "0%";
    }
    this.state.renderedPositions.push(player.position.position)

    return (<Player left={left} top={top} name={player.name} score={player.actual_points}></Player>);
  }

  getTotalScore() {
    return 25
  }
  
  getPlayers() {

  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
  };
      fetch(this.state.apiEndpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => this.setState({results: data["players"], isLoading: false}))
  }

   render() {
    const { isLoading } = this.state;
    if (isLoading){
      return <div>Loading...</div>;
    }
  
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
           {
              this.state.results.map((player) => 
              <tr>
                {this.renderPlayer(player)}
              </tr>)
              }
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
