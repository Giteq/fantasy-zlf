import React from "react";
import { Component } from 'react';
import RestApiMgr from '../Common'
import '../styles/ResultsTable.css'



class AllUsers extends RestApiMgr {

    constructor(props) {
        super(props);
        this.state.apiEndpoint = 'http://localhost:8000/users/';
    }

    render() {
        console.log('This is your data', this.state.results);
        return (
            this.state.results.map((user) => 
            <tr>
                <td>{user.username}</td>
                <td>{user.total_points}</td>
            </tr>)
        )
    }
}


export default class ResultsTable extends Component { 
    render() {

        return (
            <div>
                <table class="container">
                    <thead>
                        <tr>
                            <th><h1>Imię</h1></th>
                            <th><h1>Wynik</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        <AllUsers/>
                    </tbody>
                </table>
            </div>
    )
    }
}

