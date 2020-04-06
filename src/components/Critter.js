import React from 'react';
import './CritterMovement.css';
import './Critter.css';

const Critter = (props) => {
  let { startPosition, side, leaning, bobbing, speed, delay, bobbingSpeed, bobbingDelay } = props.animationValues;
  // list item gets one class for animation keyframes
	const sideArray = [["top horizontal", "down"], ["bottom horizontal", "up"], ["left vertical", "right"], ["right vertical", "left"]];
	// if seek is true, it means initial load places item in center
	if(props.seek){ delay = (-1 * delay) - 10; }


  return <li 
		className={"item " + sideArray[side][0] + startPosition} 
		style={{animation: `${sideArray[side][1]}${leaning} linear ${speed}s ${delay}s `}} 
		onAnimationEnd={(e) => { if(e.animationName.includes("bobbing")){ return; } props.onAnimationEnd(props.index) } }
		onMouseOver={props.onMouseOver}
		id={"item-" + props.index}>
		<a href={props.item.url}>
			<img 
				loading="lazy" 
				className="item_image" 
				alt={props.item.title}
				src={props.item.imagepath}
				style={{animation: "bobbing" + bobbing + " ease-in-out " + bobbingSpeed +"s " + bobbingDelay + "s"}}
				/>
			<aside className="text_container">
				<h1 className="item_title item_text">{props.item.title}</h1>
				<div className={"categories " + props.item.category.toLowerCase()}>
					<span className="item_category invasion">Invasion</span>
					<span className="item_category capital active_category">Capital</span>
					<span className="item_category acceleration">Acceleration</span>
					<span className="item_category empire">Empire</span>
				</div>
			</aside>
		</a>
	</li>;
}

export default Critter;