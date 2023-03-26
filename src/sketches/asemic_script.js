import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import P5InstanceContext from '../P5InstanceContext';

	export default (props) => {

		const CANVAS_SIZE = 500;
		const CANVAS_WIDTH = 0.8*window.innerWidth;
		const CANVAS_HEIGHT = 0.8*window.innerHeight;
		const CENTER = CANVAS_SIZE/2;
    	const [p5Instance, setP5Instance] = useState(null);

		useEffect(() => {
			if (p5Instance) {
			  props.setP5Instance(p5Instance);
			}
			return () => {
			  props.setP5Instance(null);
			};
		  }, [p5Instance]);

		  useEffect(() => {
			if (p5Instance) {
			  p5Instance.redraw();
			}
		  }, [p5Instance, props.regenerate]);

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
		p5.noLoop();
	};

	//----------------
	//Helper Functions
	//----------------

	function scaleZeroedVectorsToCanvas(p5, points, width){
		console.log("szvtc", points);

		let scaled_points = [];
		points.forEach(point => {
			scaled_points.push(point.mult(p5.width/width).copy());
		});
		return scaled_points;
	}

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
	//GlyphBox Function
	//----------------

	function placeGlyphsInGlyphBox(p5, pointsArr, horizontalSegments, verticalSegments){
		let row = [];
		let col = [];
		let glyph = [];
		let horizontalCounter = 0;
		let verticalCounter = 0;

		for(let i = 0; i < pointsArr.length; i++){
			for(let j = 0; j < pointsArr[i].length; j++){
				let point = pointsArr[i][j].copy();
				point.add(horizontalCounter * 2 + 1, verticalCounter * 2 + 1);
				col.push(point);
			}
			horizontalCounter++;
			if(horizontalCounter === horizontalSegments){
				verticalCounter++;
				horizontalCounter = 0;
				row.push(col);
				col = [];
			}
		}
		return row;
	}

	//----------------
	//Driver Function
	//----------------

	const draw = (p5) => {
		p5.background(255);

		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
		p5.background(255);
		let centroids = generateGlyphDomain(p5);
		console.log("centroids", centroids);

		const horizontalSegments = 20; 
		const verticalSegments = 20;

		let glyphsArr = [];
		for(let i = 0; i < horizontalSegments * verticalSegments; i++){
			let points = generateRandomPointsNaive(p5, centroids);
			glyphsArr.push(points);
		}

		let points = generateRandomPointsNaive(p5, centroids);
		console.log("points", points);

		let glyphBox = placeGlyphsInGlyphBox(p5, glyphsArr, horizontalSegments, verticalSegments);
		console.log("glyphBox", glyphBox);
		
		p5.stroke("black");
		p5.strokeWeight(1);

		for(let i = 0; i < glyphBox.length; i++){
			createGlyph(p5, arrayVectorToPair(scaleZeroedVectorsToCanvas(p5, glyphBox[i], horizontalSegments * 2)));
		}
		
		if (!p5Instance) {
			setP5Instance(p5);
		  }

	};

	return (
        <P5InstanceContext.Provider value={p5Instance}>
            <div>
                <Sketch setup={setup} draw={draw} />
                {/* Other components that may require the p5Instance */}
            </div>
        </P5InstanceContext.Provider>
    );
};