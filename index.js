let canvas = document.querySelector('.canvas');
let context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snow = {
	x: Math.random() * 40 + 20,
	y: 0
};

const createMountain = () => {
	context.beginPath();
	context.strokeStyle = "rgba(52, 18, 14)";
	context.lineWidth = 1;
	let randomMountain1 = Math.random() * 10;
	let randomMountain2 = Math.random() * 20;
	let randomMountain3 = Math.random() * 30;
	let randomMountain4 = Math.random() * 40;
	let mountainPos = {x: [], y: []};
	for (let i = 0; i < 101; i++) {
		mountainPos.x[i] = i * window.innerWidth / 100;
		mountainPos.y[i] = Math.sin((mountainPos.x[i] * 0.5 * randomMountain1 / window.innerWidth) * Math.PI / 2) * 200 + 
			Math.sin((mountainPos.x[i] * 0.5 * randomMountain2 / window.innerWidth) * Math.PI / 2) * 30 + 
			Math.sin((mountainPos.x[i] * 0.1 *randomMountain3 / window.innerWidth) * Math.PI / 2) * 30 + 
			Math.sin((mountainPos.x[i] * 0.01 * randomMountain4 / window.innerWidth) * Math.PI / 2) * 50 + 
			window.innerHeight - 300;
		if (i == 0) {
			context.moveTo(mountainPos.x[i], mountainPos.y[i]);
		} else {
			context.lineTo(mountainPos.x[i], mountainPos.y[i]);
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
	if (snow.y >= canvas.height) {
		return
	};
	context.beginPath();
	context.fillStyle = "rgb(255, 255, 255)";
	context.shadowBlur = 10;
	context.shadowColor = "rgb(255, 255, 255)";
	context.moveTo(snow.x, snow.y);
	context.arc(snow.x, snow.y, 10, 0, Math.PI * 2);
	context.fill();
	snow.y += 0.1;
};

createMountain();
createSnow();
setInterval(() => {
	createSnow();
}, 1);