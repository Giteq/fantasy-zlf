import React, { Component } from 'react';
import styles from './Pitch.css'
import PitchImg from './images/futsalfield.jpg'
import ShirtImg from './images/koszulka.jpg'
import './ResultsTable.css'

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

export class Pitch extends Component {
  
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
