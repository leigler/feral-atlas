import React, { Component } from 'react';
import './Drawer.css';

class Drawer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			drawerOpen : false
		}
	
	this.openDrawer = this.openDrawer.bind(this);

	}

	openDrawer(){
		this.setState({drawerOpen : !this.state.drawerOpen})
	}


	componentDidUpdate(props, prevProps){
		if(prevProps.critters && prevProps.critters.length === this.props.critters.length){ return }

	}

	render(){

		console.log(this.props)

		const grid = this.props.critters.map((critter, index) => {
			return <li key={index}>
				<a href={critter.url}>
					<img 
						loading="lazy" 
						className="grid_image" 
						alt={critter.title}
						src={critter.imagepath}
						/>
				</a>
			</li>
		})

		return (
			<nav 
				id="Drawer"
				className={(this.state.drawerOpen) ? 'open' : '' }
			>
				<header id="DrawerHeader">
					<button 
						id="DrawerOpener"
						onClick={this.openDrawer}
					>
						<span className="hamburgerLine"></span>
						<span className="hamburgerLine"></span>
						<span className="hamburgerLine"></span>
					</button>
				</header>
				<ul id="critterArray">{grid}</ul>
			</nav>
		)
	}

}

export default Drawer;