import React from "react";
import Sketch from "react-p5";

	export default (props) => {

		const CANVAS_SIZE = 500;
		const CENTER = CANVAS_SIZE/2;

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(CANVAS_SIZE, CANVAS_SIZE).parent(canvasParentRef);
		p5.noLoop();
	};
	
	function generatePointInUnitCircle(p5){
		let radius = p5.sqrt(p5.random());
		let theta = p5.random(0, p5.TWO_PI);
		return p5.createVector(radius * p5.cos(theta), radius * p5.sin(theta));
	}

	function generateGlyphDomain(p5){
		p5.strokeWeight(0);
		p5.circle(p5.width/2, p5.height/2, p5.width);
		
		p5.fill(220, 220, 50, 80);
		p5.ellipse(CENTER, CENTER, p5.width/2, p5.height);
		
		p5.translate(p5.width/2, p5.width/2);
		p5.rotate(p5.QUARTER_PI);
		p5.fill(50, 220, 50, 80);
		p5.ellipse(0, 0, p5.width/2, p5.height);
		p5.rotate(-p5.QUARTER_PI);
		p5.translate(-p5.width/2, -p5.width/2);

		//2D array to hold red, orange, and green points
		let points = []
		for (let i = 0; i < 3; i++) {
			points.push([]);
		}


		let centroids = [];
		for (let i = 0; i < 5; i++) {
			let point = generatePointInUnitCircle(p5);

			centroids.push(point.copy());

			point.x = point.x * (p5.width/2) + CENTER;
			point.y = point.y * (p5.width/2) + CENTER;
			
			p5.stroke('red');
			p5.strokeWeight(6);
			p5.point(point.x, point.y);

			points[0].push(p5.createVector(point.x, point.y));
		}

		const squish_value = 0.5; 

		centroids.forEach(centroid => {
			console.log("Centroid", centroid);
			centroid.x = centroid.x * squish_value;
			centroid.y = centroid.y * squish_value;

			p5.strokeWeight(6);
			p5.stroke('orange');
			p5.point(centroid.x * (p5.width/2) + CENTER, centroid.y * (p5.width/2) + CENTER);
			
			points[1].push(p5.createVector(centroid.x * (p5.width/2) + CENTER, centroid.y * (p5.width/2) + CENTER));
			
			centroid.rotate(p5.QUARTER_PI);

			p5.stroke('green');
			p5.point(centroid.x * (p5.width/2) + CENTER, centroid.y * (p5.width/2) + CENTER);
			
			points[2].push(p5.createVector(centroid.x * (p5.width/2) + CENTER, centroid.y * (p5.width/2) + CENTER));
		});

		return points;
	}
	
	function createGlyph(p5, points){
		//WIP
		p5.stroke("black");
		
		generateBezier(p5, points[0]); //orange


		
		//generateBezier(p5, points[1]); //orange
		//generateBezier(p5, points[2]); //green
	}

	//generate a Bezier curve of any order using an array of vectors
	function generateBezier(p5, points) {
		p5.noFill();
		p5.beginShape();
		for (let t = 0; t <= 1; t += 0.01) {
		  	let x = 0;
			let y = 0;
			for (let i = 0; i < points.length; i++) {
				let a = factorial(points.length - 1) / (factorial(i) * factorial(points.length - 1 - i));
				let b = Math.pow(1 - t, points.length - 1 - i) * Math.pow(t, i);
				x += a * b * points[i].x;
				y += a * b * points[i].y;
				
		  	}
		  	p5.vertex(x, y);
		}
		p5.endShape();
	}
	  
	function factorial(n) {
		if (n === 0) {
			return 1;
		}
		let result = 1;
		for (let i = 1; i <= n; i++) {
			result *= i;
		}
		return result;
	}

	const draw = (p5) => {
		p5.background(0);
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
		
		let points = generateGlyphDomain(p5);
		createGlyph(p5, points);

	};

	return <Sketch setup={setup} draw={draw} />;
};