import React, { Component } from 'react';
import Drawer from './components/Drawer.js';
import Surface from './components/Surface.js';
import './App.css';


class App extends Component {
  constructor(props){
  	super(props);

  	this.state = {
  		surfaceList : [],
      drawerList : []
  	}

    this.shuffleArray = this.shuffleArray.bind(this);
  }

  shuffleArray(critters){
    const array = critters;
    console.log("shuffle")
    if(array.length === 0 ) {return [] }
    let i = array.length, k , temp;
    while(--i > 0){
      k = Math.floor(Math.random() * (i+1));
      temp = array[k];
      array[k] = array[i];
      array[i] = temp;
    }
    // shuffled array:
    this.setState({surfaceList : array})
  } 

  alphaArray(critters){
    const array = critters;
    console.log("alpha")
    array.sort(function(a, b) {
      var titleA = a.title.toUpperCase();
      var titleB = b.title.toUpperCase();
      if (titleA < titleB) { return -1; }
      if (titleA > titleB) { return 1; }
      return 0;
    });

    // alphabetical array
    this.setState({ drawerList: array })
  }

  fetchCritters(){
  	fetch('/files/critters.json')
 		.then(r => r.json())
 		.then(critters => {
      if(!Array.isArray(critters)){ return; }
      
      this.shuffleArray(critters)
      this.alphaArray(critters)
 		})
  }

  componentDidMount(){
  	this.fetchCritters()
  }

  render() {

    return (
      <div className="App">
        <Surface critters={this.state.surfaceList} shuffleArray={this.shuffleArray} />
        <Drawer critters={this.state.drawerList} />
      </div>
    );
  }
}

export default App;
