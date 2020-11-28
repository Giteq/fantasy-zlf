import { Component } from 'react';

export default class RestApiMgr extends Component {
        
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        };
      }

    componentDidMount() {
        fetch(this.state.apiEndpoint)
          .then((response) => response.json())
          .then((data) => this.setState({results: data["results"]}));
    }
}