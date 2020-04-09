import React, { Component } from 'react';
import Surface from './components/Surface.js';
import Drawer from './components/Drawer.js';
import './App.css';


class App extends Component {
  constructor(props){
  	super(props);

  	this.state = {
  		critters : []
  	}

  }

  fetchCritters(){
  	return fetch('/files/critters.json')
 		.then(r => r.json())
 		.then(critters => {
 			if(!Array.isArray(critters)){ return; }
 			this.setState({critters})
 		})
  }

  componentDidMount(){
  	this.fetchCritters()
  }

  render() {
    return (
      <div className="App">
        <Surface critters={this.state.critters} />
        <Drawer critters={this.state.critters} />
      </div>
    );
  }
}

export default App;
