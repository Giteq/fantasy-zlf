import React, { Component } from 'react';
import PitchImg from './images/futsalfield.jpg'
import '../styles/ResultsTable.css'
import RestApiMgr from '../Common'
import { authHeader } from '../_helpers/auth-header';
import { Player } from '../Common'

class BasePitch extends React.Component {

  getTotalScore() {
    return 25
  }
  
  getPlayers() {

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
              this.getPlayers().map((player) => 
              <tr>
                {this.renderPlayer(player)}
              </tr>)
              }
            </div>
        </div>
       )
   }

}

export class ResultsPitch extends BasePitch {
  
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

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
  };
      fetch(this.state.apiEndpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => this.setState({results: data["players"], isLoading: false}))
  }
  getPlayers = () => {
      return this.state.results;
  }

}

export class SelectPitch extends BasePitch {
  constructor(props){
    super(props)
    this.state = {
      divPitch: {
        position: 'relative',
        height: '550px',
        width: '250px',
        top: 150
      },
      pitchStyle: {
        width: "100%",
        height: "100%",
        backgroundImage:  `url(${PitchImg})`
      },
      renderedPositions: []
    }
  }

  getPlayers = () => {
    return [];
  }

}



var divParent = {
  'height': '100vh', /* Magic here */
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center'
};
