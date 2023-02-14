let canvas = document.querySelector('.canvas');
let context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 渲染畫面用
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

let snow = {
	x: Math.random() * 40 + 200,
	y: 0
};
let mountainPos = {x: [], y: []};
let dx1 = 0;
let dy1 = 0;
let preP;
let myReq;

const createMountain = () => {
	const gradient = (a, b) => {
		return (b.y-a.y)/(b.x-a.x);
	};
	const drawLine = (index, obj) => {
		if (index == 0) {
			preP = {x:obj.x[0], y:obj.y[0]};
			context.moveTo(obj.x[index], obj.y[index]);
		} else {
			let f = 0.3;
			let t = 1;
			let m = 0;
			curP = {x:obj.x[index], y:obj.y[index]};
			nexP = {x:obj.x[index + 1], y:obj.y[index + 1]};
			if (nexP) {
				m = gradient(preP, nexP);
				dx2 = (nexP.x - curP.x) * -f;
				dy2 = dx2 * m * t;
			} else {
				dx2 = 0;
				dy2 = 0;
			}
			context.bezierCurveTo(preP.x - dx1, preP.y - dy1, curP.x + dx2, curP.y + dy2, curP.x, curP.y);
			dx1 = dx2;
			dy1 = dy2;
			preP = curP;
		}
	};
	context.beginPath();
	context.strokeStyle = "rgba(52, 18, 14)";
	context.lineWidth = 1;
	if (mountainPos.x.length > 0) {
		context.shadowBlur = 0;
		for (let i = 0; i < mountainPos.x.length; i++) {
			drawLine(i, mountainPos);
		}
	} else {
		let landHeight = window.innerHeight - 300;
		let randomMountain1 = Math.random() * 10;
		let randomMountain2 = Math.random() * 20;
		let randomMountain3 = Math.random() * 30;
		let randomMountain4 = Math.random() * 40;
		for (let i = 0; i < 52; i++) {
			mountainPos.x[i] = i * window.innerWidth / 50;
			mountainPos.y[i] = perlin.get(mountainPos.x[i], 200) * 100 + landHeight;
			drawLine(i, mountainPos);
		}
	}
	context.lineTo(window.innerWidth, window.innerHeight);
	context.lineTo(0, window.innerHeight);
	context.closePath();
	context.fillStyle = "rgb(0, 200, 0)";
	context.stroke();
	context.fill();
};

const clearCanvas = () => {
	context.clearRect(0,0,canvas.width,canvas.height);
};

const createSnow = () => {
	context.beginPath();
	context.fillStyle = "rgb(255, 255, 255)";
	context.shadowBlur = 10;
	context.shadowColor = "rgb(255, 255, 255)";
	context.moveTo(snow.x, snow.y);
	context.arc(snow.x, snow.y, 10, 0, Math.PI * 2);
	context.fill();
	snow.y += 0.1;
};

const render = () => {
	if (snow.y >= canvas.height) {
		cancelAnimationFrame(myReq);
		return
	};
	clearCanvas();
	createSnow();
	createMountain();
	myReq = requestAnimationFrame(render);
};

createMountain();
createSnow();
myReq = requestAnimationFrame(render);