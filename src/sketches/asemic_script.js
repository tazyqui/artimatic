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

	//Individual Glyph Drawing
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
		p5.curveVertex(points[0].x, points[0].y);
		points.forEach(point => {
			p5.curveVertex(point.x, point.y);
		})
		p5.curveVertex(points[points.length-1].x, points[points.length-1].y);
		p5.endShape();
	}

	function createGlyph(p5, points){
		generateSpline(p5, points);
	}

	//generate a Bezier curve of any order using p5 vectors and return points at each steps
	function generateBezier(p5, points, steps) {
		console.log('bezier points', points);
	   let intermediatePoints = [];
		p5.noFill();
		p5.beginShape();
		for (let t = 0; t <= 1; t += 1/steps) {
			  let x = 0;
			let y = 0;
			for (let i = 0; i < points.length; i++) {
				let a = factorial(points.length - 1) / (factorial(i) * factorial(points.length - 1 - i));
				let b = Math.pow(1 - t, points.length - 1 - i) * Math.pow(t, i);
				x += a * b * points[i].x;
				y += a * b * points[i].y;
			   
			 }
			  p5.vertex(x, y);
		   intermediatePoints.push(p5.createVector(x,y));
		}
		p5.endShape();
	   return intermediatePoints;
	   
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

	//given array of points, squish their values by given factor of x and y and return it as an array
	function squishPoints(points, factorX, factorY) {
		return points.map(point => {return point.copy().mult(factorX, factorY)});
	}
	//given array of points, rotate each point by a given angle and return it as an array
	function rotatePoints(points, angle){
		return points.map(point => {return point.copy().rotate(angle)});
	}

	//given a singular glyph (array of points), offset the points by factor of x and y and return it as an array
	function offsetGlyph(points, offsetX, offsetY){
		return points.map(point => {return point.copy().add(offsetX, offsetY)});
	}

	//given a row of glyphs as array of points, return array containing subarray of points. (Variance cannot be greater than or equal to median)
	function applyWordLengthVariation(p5, glyphsRow, numOfCtrlPts, median, variance){
		if(variance >= median){
			return glyphsRow;
		}

		let length = p5.random(median - variance, median + variance);
		let currLength = 1;
		numOfCtrlPts = 5; //temp
		let arrayOfSubArrays = [];
		
		for(let i = 0; i < glyphsRow.length; i+=numOfCtrlPts){
			if(currLength != length || i == glyphsRow.length - 1){
				for(let j = i; j < numOfCtrlPts; j++){
					arrayOfSubArrays.push(glyphsRow[j]);
				}
				currLength++;
				continue;
			}
			length = p5.random(median - variance, median + variance);
		}		

		return arrayOfSubArrays;
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

		//let points = generateRandomPointsNaive(p5, centroids);
		//console.log("points", points);

		let glyphBox = placeGlyphsInGlyphBox(p5, glyphsArr, horizontalSegments, verticalSegments);
		console.log("glyphBox", glyphBox);
		
		p5.stroke("black");
		p5.strokeWeight(1);

		for(let i = 0; i < glyphBox.length; i++){
			createGlyph(p5, scaleZeroedVectorsToCanvas(p5, glyphBox[i], horizontalSegments * 2));
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