//May be useful in future

//generate a Bezier curve of any order using points as array of [x,y] arrays
	// function generateBezier(p5, points) {
	// 	console.log('bezier points', points);
	// 	p5.noFill();
	// 	p5.beginShape();
	// 	for (let t = 0; t <= 1; t += 0.01) {
	// 	  	let x = 0;
	// 		let y = 0;
	// 		for (let i = 0; i < points.length; i++) {
	// 			let a = factorial(points.length - 1) / (factorial(i) * factorial(points.length - 1 - i));
	// 			let b = Math.pow(1 - t, points.length - 1 - i) * Math.pow(t, i);
	// 			x += a * b * points[i][0];
	// 			y += a * b * points[i][1];
				
	// 	  	}
	// 	  	p5.vertex(x, y);
	// 	}
	// 	p5.endShape();
	// }
	  
	// function factorial(n) {
	// 	if (n === 0) {
	// 		return 1;
	// 	}
	// 	let result = 1;
	// 	for (let i = 1; i <= n; i++) {
	// 		result *= i;
	// 	}
	// 	return result;
	// }