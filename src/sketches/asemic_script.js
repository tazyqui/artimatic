import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import * as d3 from 'd3-voronoi';
import { polygonContains } from 'd3-polygon';
import Download from "../components/Download";
import P5InstanceContext from '../P5InstanceContext';

	export default (props) => {

		const CANVAS_SIZE = 500;
		const CENTER = CANVAS_SIZE/2;
		const [downloaded, setDownloaded] = useState(false);
    	const [p5Instance, setP5Instance] = useState(null);

		useEffect(() => {
			if (p5Instance) {
				props.setP5Instance(p5Instance);
			}
		}, [p5Instance]);

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(CANVAS_SIZE, CANVAS_SIZE).parent(canvasParentRef);
		p5.noLoop();
	};

	const handleDownload = () => {
        console.log('Download button clicked');
        if (p5Instance) {
            p5Instance.saveCanvas("canvas", "png");
            setDownloaded(true);
        }
    };

	function scaleVectorsToCanvas(p5, points){
		console.log("svtc", points);
		let scaled_points = [];
		points.forEach(point => {
			scaled_points.push(point.mult(p5.width/2).add(p5.createVector(CENTER, CENTER)).copy());
		});
		return scaled_points;
	}
	
	function arrayVectorToPair(vectors){
		let pairs = [];
		vectors.forEach(vector => {
			pairs.push([vector.x, vector.y]);
		});
		return pairs;
	}

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


		let centroids = [];
		for (let i = 0; i < 5; i++) {
			let point = generatePointInUnitCircle(p5);

			centroids.push(point.copy());

			point.x = point.x * (p5.width/2) + CENTER;
			point.y = point.y * (p5.width/2) + CENTER;
			
			p5.stroke('red');
			p5.strokeWeight(6);
			p5.point(point.x, point.y);
		}

		const squish_value = 0.5; 

		centroids.forEach(centroid => {
			//console.log("Centroid", centroid);
			let new_centroid = p5.createVector(centroid.x * squish_value, centroid.y * squish_value);

			p5.strokeWeight(6);
			p5.stroke('orange');
			p5.point(new_centroid.x * (p5.width/2) + CENTER, new_centroid.y * (p5.width/2) + CENTER);
			

			
			new_centroid.rotate(p5.QUARTER_PI);

			p5.stroke('green');
			p5.point(new_centroid.x * (p5.width/2) + CENTER, new_centroid.y * (p5.width/2) + CENTER);
			//points.push([centroid.x * (p5.width/2) + CENTER, centroid.y * (p5.width/2) + CENTER]);

		});

		return centroids;
	}

	//generate a Bezier curve of any order using points as array of [x,y] arrays
	function generateBezier(p5, points) {
		console.log('bezier points', points);
		p5.noFill();
		p5.beginShape();
		for (let t = 0; t <= 1; t += 0.01) {
		  	let x = 0;
			let y = 0;
			for (let i = 0; i < points.length; i++) {
				let a = factorial(points.length - 1) / (factorial(i) * factorial(points.length - 1 - i));
				let b = Math.pow(1 - t, points.length - 1 - i) * Math.pow(t, i);
				x += a * b * points[i][0];
				y += a * b * points[i][1];
				
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

	//generate a spline using points as array of [x,y] arrays
	function generateSpline(p5, points){
		p5.noFill();
		p5.strokeWeight(6);
		console.log(points.length);
		p5.beginShape();
		p5.curveVertex(points[0][0], points[0][1]);
		points.forEach(point => {
			p5.curveVertex(point[0], point[1]);
		})
		p5.curveVertex(points[points.length-1].x, points[points.length-1].y);
		p5.endShape();
	}

	//given the centroid as array of [x,y] arrays, return random points for each voronoi cell as an array of [x,y] arrays
	function generateRandomPoints(p5, centroids) {
		const voronoi = d3.voronoi().extent([[0, 0], [CANVAS_SIZE, CANVAS_SIZE]]);
		const polygons = voronoi(centroids).polygons();
		const randomPoints = [];
		
		polygons.forEach((polygon) => {
		  const bounds = polygon.reduce((bounds, [x, y]) => {
			return [
			  Math.min(bounds[0], x),
			  Math.min(bounds[1], y),
			  Math.max(bounds[2], x),
			  Math.max(bounds[3], y),
			];
		  }, [Infinity, Infinity, -Infinity, -Infinity]);
	  
		  let point;
		  do {
			point = [Math.random() * (bounds[2] - bounds[0]) + bounds[0], Math.random() * (bounds[3] - bounds[1]) + bounds[1]];
			
		  } while (!polygonContains(polygon, point));
		  
		  
		  randomPoints.push([point[0], point[1]]);
		  p5.stroke("blue");
		  p5.strokeWeight(20);
		  p5.point(point[0], point[1]);
		});
		

		return randomPoints;
	}

	function indexClosestCentroid(p5, centroids, point){
		let closestIndex = 0;
		let closest = centroids[0];
		for(let i = 0; i < centroids.length; i++){
			if(centroids[i].dist(point) < closest.dist(point)){
				closest = centroids[i];
				closestIndex = i;
			}
		}
		return closestIndex;
	}

	function generateRandomPointsNaive(p5, centroids){
		let points = [];
		let pointInCell = [];
		centroids.forEach(x => {
			pointInCell.push(false);
		});
		while(points.length !== centroids.length){
			let point = generatePointInUnitCircle(p5);
			let index = indexClosestCentroid(p5, centroids, point);
			if(!pointInCell[index]){
				pointInCell[index] = true;
				points.push(point);
			}
		}
		return points;
	}

	function createGlyph(p5, points){
		//WIP
		p5.stroke("black");
		p5.strokeWeight(6);
		//generateBezier(p5, points);
		generateSpline(p5, points);
	}

	

	const draw = (p5) => {
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
		if (!downloaded) {
		let centroids = generateGlyphDomain(p5);
		console.log("centroids", centroids);
		let points = generateRandomPointsNaive(p5, centroids);
		console.log("points", points);
		
		//let points = generateRandomPoints(p5, centroids);
		createGlyph(p5, arrayVectorToPair(scaleVectorsToCanvas(p5, points)));
		}
		if (!p5Instance) {
			setP5Instance(p5);
		  }
	};

	return (
        <div>
            <Sketch setup={setup} draw={draw} />
        </div>
    );
};