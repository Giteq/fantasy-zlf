import React from "react";
import RestApiMgr from '../Common'
import '../styles/ResultsTable.css'
import { Component } from 'react';
import {Link} from "react-router-dom";


var buttonStyle = {
    'width': '150px',
    'height': '30px',
};
  

class PlayerLink extends Component {

    render (){
        return (
        <td><Link to={{pathname: "/transferPlayer", state: {player: this.props.player}}} >{this.props.value}</Link></td>
        )
    }
}


class AllPlayers extends RestApiMgr {

    constructor(props) {
        super(props);
        this.state.apiEndpoint = 'http://localhost:8000/players/';
    }

    render() {
        return (
            this.state.results.map((player) => 
            <tr>
                <PlayerLink player={player} value={player.name}/>
                <PlayerLink player={player} value={player.total_points}/>
            </tr>)
        )
    }
}


export const TransfersTable = () => (
    <div>
    <table class="container">
        <thead>
            <tr>
                <th><h1>Imię</h1></th>
                <th><h1>Wynik</h1></th>
            </tr>
        </thead>
        <tbody>
            <AllPlayers/>
        </tbody>
    </table>
</div>
);


class TransferPlayerLink extends Component {

    render (){
        return (
        <td><a href="#" class="row-link">{this.props.value}</a></td>
        )
    }
}


class SpecificPositionPlayer extends RestApiMgr {

    constructor(props) {
        super(props);
        this.state.apiEndpoint = 'http://localhost:8000/players/';
    }

    render() {
        return (
            this.state.results.map((player) => 
                { 
                    if(this.props.player.position === player.position && this.props.player.name !== player.name)
                        return (
                            <tr>
                                <TransferPlayerLink value={player.name}/>
                                <TransferPlayerLink value={1223}/>
                            </tr>
                        )
                }
            )
            )
    }
}


export class TransferSinglePlayer extends Component {

    render() {
            return (
            <div>
                <table border = "1">
                    <thead>
                        <tr>
                            <th><h1>Imię</h1></th>
                            <th><h1>Cena</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        <SpecificPositionPlayer player={this.props.location.state.player}></SpecificPositionPlayer>
                    </tbody>
                </table>
            </div>
        )
    } 
}

export default TransfersTable;
