import React from "react";
import Sketch from "react-p5";
import * as d3 from 'd3-voronoi';
import { polygonContains } from 'd3-polygon';

	export default (props) => {

		const CANVAS_SIZE = 500;
		const CENTER = CANVAS_SIZE/2;

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(CANVAS_SIZE, CANVAS_SIZE).parent(canvasParentRef);
		p5.noLoop();
	};

	//----------------
	//Helper Functions
	//----------------

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

	//----------------
	//Generate Domain Functions
	//----------------

	function generatePointInUnitCircle(p5){
		let radius = p5.sqrt(p5.random());
		let theta = p5.random(0, p5.TWO_PI);
		return p5.createVector(radius * p5.cos(theta), radius * p5.sin(theta));
	}

	function generateGlyphDomain(p5){
		let centroids = [];
		for (let i = 0; i < 5; i++) {
			let point = generatePointInUnitCircle(p5);

			centroids.push(point.copy());
		}

		return centroids;
	}

	//----------------
	//Drawing Functions
	//----------------

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

	function createGlyph(p5, points){
		p5.background(255);
		p5.stroke("black");
		p5.strokeWeight(6);

		generateSpline(p5, points);
	}

	//----------------
	//Generate Random Points from Centroids Functions
	//----------------

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

	//----------------
	//Driver Function
	//----------------

	const draw = (p5) => {
		p5.background(0);
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes

		let centroids = generateGlyphDomain(p5);
		console.log("centroids", centroids);
		let points = generateRandomPointsNaive(p5, centroids);
		console.log("points", points);
		
		createGlyph(p5, arrayVectorToPair(scaleVectorsToCanvas(p5, points)));

	};

	return <Sketch setup={setup} draw={draw} />;
};