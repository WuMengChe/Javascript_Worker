let canvas = document.querySelector('.canvas');
let context = canvas.getContext("2d");

context.strokeStyle = "rgba(52, 18, 14)";
context.lineWidth = 1;
for (let i = 0; i < 1000; i++) {
	let x = i * window.innerWidth;
	let y = Math.sin(x / window.innerWidth) * 20 + 100;
	if (i == 0) {
		context.moveTo(x, y);
	} else {
		context.lineTo(x, y);
	}
}
context.closePath();
context.stroke();