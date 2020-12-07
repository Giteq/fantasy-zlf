import React from 'react';
import RestApiMgr from '../Common'
import { authHeader } from '../_helpers/auth-header';
import { Player } from '../Common'
import {SelectPitch} from '../componenets/Pitch'


class SelectablePlayer extends Player {
    selectClick = (e) => {
        e.preventDefault();
        this.setState({divPlayer: {...this.state.divPlayer, top: this.state.divPlayer.top+50}})
        this.setState({isSeleted: true})
    }

    removeClick = (e) => {
        this.setState({divPlayer: {...this.state.divPlayer, top: this.state.divPlayer.top-50}})
        this.setState({isSeleted: false})
    }
}


export class SelectTeam extends RestApiMgr {

    constructor(props) {
        super(props);
        this.state = {
          apiEndpoint: 'http://localhost:8000/players/',
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
            .then((data) => this.setState({results: data["results"], isLoading: false}))
      }

    render() {
        const { isLoading } = this.state;
        if (isLoading){
          return <div>Loading...</div>;
        }
        console.log(this.state.results)
        var left = "100%";
        var top = "-80%";
        
        return (
            <div>
                {
                    this.state.results.map(
                        (player, i) => <SelectablePlayer top={10} left={i*200} name={player.name} score={player.actual_points}></SelectablePlayer>
                  )
                }
                <SelectPitch></SelectPitch>
            </div>
        );
    }
}
