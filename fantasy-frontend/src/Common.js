import { Component } from 'react';
import styles from './styles/Pitch.css'
import { authHeader } from './_helpers/auth-header';
import ShirtImg from './componenets/images/koszulka.jpg'
import { Button } from 'react-bootstrap';

export default class RestApiMgr extends Component {
        
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        };
      }

      componentDidMount() {
      const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
        fetch(this.state.apiEndpoint, requestOptions)
          .then((response) => response.json())
          .then((data) => this.setState({results: data["results"]}));
    }
}

export class Player extends Component {

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
          textAlign: 'center',
          left: this.props.left,
          top: this.props.top
        },
        caption: {
          display: 'block'
        },
        isSeleted: false
      }
    }
    
    selectClick = (e) => {
    }

    removeClick = (e) => {
    }

     render() {
         return (
          <div style={this.state.divPlayer}>

             {this.state.isSeleted ? (
                    <div>
                    <span class={styles.caption}>{this.props.name}</span>
                    <img src={ ShirtImg } style={this.state.shirtStyle} onClick={this.removeClick} alt=""></img>
                    <span class={styles.caption}>{this.props.score}</span>
                    </div>
                ) : (
                    <div>
                    <span class={styles.caption}>{this.props.name}</span>
                    <img src={ ShirtImg } style={this.state.shirtStyle} onClick={this.selectClick} alt=""></img>
                    <span class={styles.caption}>{this.props.score}</span>
                    </div>
            )}
          </div>
         )
     }
  }
