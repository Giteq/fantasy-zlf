import { Component } from 'react';
import { authHeader } from './_helpers/auth-header';

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