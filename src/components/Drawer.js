import React, { Component } from 'react';
import './Drawer.css';

class Drawer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			drawerOpen : false,
			windowHeight : false
		}
	
	this.openDrawer = this.openDrawer.bind(this);
	this.footerJS = this.footerJS.bind(this);

	}

	footerJS(){
		if(window.outerWidth < 768){
			// mobile screen
			var innerHeight = window.innerHeight
			this.setState({windowHeight : 'calc(' + innerHeight + 'px - 3rem)'});
		}else{
			this.setState({windowHeight : false})
		}
	}

	openDrawer(){
		this.setState({drawerOpen : !this.state.drawerOpen})
	}

	componentDidMount(){
		window.addEventListener("resize", this.footerJS.bind(this))
		this.footerJS()

	}

	componentDidUpdate(props, prevProps){
		if(prevProps.critters && prevProps.critters.length === this.props.critters.length){ return }
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.footerJS.bind(this));
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
				style={ (this.state.windowHeight) ? {top: this.state.windowHeight } : {}}
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