import React, { Component } from 'react';
import './Surface.css';
import Critter from './Critter.js';

class Surface extends Component {
  constructor(props) {
 		super(props);

 		this.state = {
 			critters : [],
 			activeCritters : [],
 			itemTracker : 27,
 			recentStartPosition : undefined,
			recentSide : undefined,
			windowHeight : window.innerHeight,
			textPosition : false
 		}

 		this.animated = this.animated.bind(this);
 		this.textPosition = this.textPosition.bind(this);

 	}

 	resize(){
		if(window.innerHeight !== this.state.windowHeight){
			this.setState({windowHeight : window.innerHeight})
		}
 	}

 	textPosition(e){
		if(e.clientY < this.state.windowHeight*0.66){
			this.setState({textPosition : true })	
		}else{
			this.setState({textPosition : false })	
		}
	}

 	arrayOrder(array){
		var i = array.length, k , temp;
		while(--i > 0){
			k = Math.floor(Math.random() * (i+1));
			temp = array[k];
			array[k] = array[i];
			array[i] = temp;
		}
	  // shuffled array:
		return array;
	}	

	critterAnimationValues(startPosition, side){
		// for all animations:
		// 1-3 position positive translations
		// 4-6 position negative translations

		let lean = Math.ceil(Math.random()*3),
				leaning = (startPosition > 5) ? lean + 3 : lean,
				bobbing = Math.ceil(Math.random()*3);

		// 2 possible animations per side and direction, upper lower and middle
		// item gets inline styles for speed
		let speed = 60 + Math.round(Math.random()*10),
				delay = Math.round(Math.random()*10),
				bobbingSpeed = 10 + Math.round(Math.random()*5),
				bobbingDelay = Math.round(Math.random()*15);

		return {startPosition, side, lean, leaning, bobbing, speed, delay, bobbingSpeed, bobbingDelay}
	}

	loadNewCritter(index){
		const item = this.state.critters[this.state.itemTracker]
		

		const {startPosition, side} = this.cyclingPositions(false);

		return {
			item : item,
			index: index,
			seek : false,
			animationValues : this.critterAnimationValues(startPosition, side)
		}
	}

	animated(critterIndex){		

		// track location in array
	  let itemTracker = this.state.itemTracker + 1;
	  if(itemTracker > this.state.critters.length - 1){
	  	itemTracker = 0;
	  	const critters = this.arrayOrder(this.state.critters); // shuffle initial order
 			this.setState({critters: critters})
	  }

	  const newCritter = this.loadNewCritter(critterIndex);
	  let activeCritters = this.state.activeCritters;
	  // replace item with another when animation is completed
	  activeCritters.splice(critterIndex, 1, newCritter)
	  
	  this.setState({ activeCritters, itemTracker })
	}

	cyclingPositions(initial){
		let startPosition = Math.floor(Math.random()*11),
		side = Math.floor(Math.random()*4);

		if(!initial){
			// update startPosition to not repeat
			if(startPosition === this.state.recentStartPosition){
				startPosition = (startPosition !== 10) ? startPosition + 1 : 0
			}
			// update side if previous was same
			if(side === this.state.recentSide){
				side = (side !== 3) ? side + 1 : 0;
			}
			
			this.setState({recentStartPosition: startPosition, recentSide : side})

		}

		return {
			startPosition, side
		}
	}

	addActiveCritters(){
		let compiledCritters = [], recentStartPosition, recentSide;

		this.state.critters.forEach((item, index) => {	
			if(index > 27){ return; }

			let {startPosition, side } = this.cyclingPositions(true);

			// update startPosition to not repeat
			if(startPosition === recentStartPosition){
				startPosition = (startPosition !== 10) ? startPosition + 1 : 0
			}
			// update side if previous was same
			if(side === recentSide){
				side = (side !== 3) ? side + 1 : 0;
			}

			recentStartPosition = startPosition;
			recentSide = side;


			compiledCritters.push({
				item : item,
				index: index,
				seek : (index < 9) ? true : false,
				animationValues : this.critterAnimationValues(startPosition, side)
			})

		})


		const activeCritters = compiledCritters.slice(0,18);
		const delayedCritters = compiledCritters.slice(18, 27);
		
		this.setState({activeCritters, recentStartPosition, recentSide})

		this.delay = setTimeout(() => {
					this.setState({ 
						activeCritters: [
							...this.state.activeCritters.concat(delayedCritters) 
						] 
					})
		}, 7000)

	}


 	fetchCritters(){
 		return fetch('/files/critters.json')
 		.then(r => r.json())
 		.then(critters => {
 			if(!Array.isArray(critters)){ return; }
 			
 			critters = this.arrayOrder(critters); // shuffle initial order

 			this.setState({critters})
 			this.addActiveCritters()

 		})
 	}

  componentDidMount(){
  	window.addEventListener("resize", this.resize.bind(this));
  	this.fetchCritters();
  }

  componentDidUpdate(){
		
  }

  componentWillUnmount(){
		window.removeEventListener("resize", this.resize.bind(this));
		
		if(this.delay !== undefined){
			clearTimeout(this.delay)
		}
		
  }

  render() {
  	const critters = this.state.activeCritters.map((critter, index) =>
		  <Critter 
		  	item={critter.item} 
		  	seek={critter.seek} 
		  	index={critter.index}
		  	animationValues={critter.animationValues}
		  	onAnimationEnd={this.animated}
		  	onMouseOver={this.textPosition}
		  	key={index}
		  />
		);

    return (
      <ul id="Surface" className={(this.state.textPosition) ? '' : 'above'}>
      	{critters}
      </ul>
    );
  }
}

export default Surface;