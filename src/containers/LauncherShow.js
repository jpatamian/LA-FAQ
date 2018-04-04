import React from 'react';
import LauncherInfo from '../components/LauncherInfo'

class LauncherShow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      launcherInfo: {}
    }
  }

  componentDidMount() {
    let launcherId = this.props.params.id
    fetch(`/api/v1/launchers/${launcherId}`)
      .then(response => {
        if(response.ok){
          return response;
        } else {
          let errorMessage = ('${response.status} (${response.statusText}')
          error = new Error(errormessage);
        throw(error);
        }
      })
      .then(response => response.json())
      .then(response => {
        this.setState({launcherInfo:response})
      })
    }

  render(){
    return(
      <LauncherInfo
        id={this.state.launcherInfo.id}
        name={this.state.launcherInfo.name}
        bio = {this.state.launcherInfo.id}
      />
    )
  }
}

export default LauncherShow;
