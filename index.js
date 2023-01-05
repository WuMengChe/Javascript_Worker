let canvas = document.querySelector('.canvas');
let context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.strokeStyle = "rgba(52, 18, 14)";
context.lineWidth = 1;
let mountainPos = {x: [], y: []};
for (let i = 0; i < 101; i++) {
	mountainPos.x[i] = i * window.innerWidth / 100;
	mountainPos.y[i] = Math.sin((mountainPos.x[i] / window.innerWidth) * Math.PI / 2) * 200 + window.innerHeight - 300;
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