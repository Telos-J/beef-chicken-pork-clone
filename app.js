const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const angle = 100;

function drawLeftSection() {
    context.save();

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvas.width / 2 - angle, 0);
    context.lineTo(canvas.width / 2 + angle, canvas.height);
    context.lineTo(0, canvas.height);
    context.clip();

    context.fillStyle = '#ff66ff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#3399ff';
    leftShape(object.x);

    context.restore();
}

function drawRightSection() {
    context.save();

    context.beginPath();
    context.moveTo(canvas.width / 2 - angle, 0);
    context.lineTo(canvas.width, 0);
    context.lineTo(canvas.width, canvas.height);
    context.lineTo(canvas.width / 2 + angle, canvas.height);
    context.clip();

    context.fillStyle = '#3399ff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#ff66ff';
    rightShape(object.x);

    context.restore();
}

function drawHourglass(x) {
    context.beginPath();
    context.moveTo(x, 100);
    context.lineTo(x + 550, 50);
    context.lineTo(x + 450, 500);
    context.lineTo(x + 550, canvas.height - 80);
    context.lineTo(x + 50, canvas.height - 80);
    context.lineTo(x + 150, 200);
    context.fill();
}

function drawChunk(x) {
    context.beginPath();
    context.arc(x + 250, canvas.height / 2, 300, 0, (Math.PI / 2) * 3);
    context.fill();
}

function drawPizza(x) {
    context.beginPath();
    context.moveTo(x + 50, 50);
    context.arc(x + 50, 50, 600, Math.PI / 4, Math.PI / 2);
    context.fill();
}

function drawHat(x) {
    context.beginPath();
    context.moveTo(x, 550);
    context.lineTo(x + 100, 50);
    context.lineTo(x + 450, 500);
    context.lineTo(x + 520, canvas.height - 80);
    context.lineTo(x + 50, canvas.height - 80);
    context.lineTo(x + 150, 200);
    context.fill();
}

function drawShoe(x) {
    context.beginPath();
    context.moveTo(x, 50);
    context.lineTo(x + 150, 50);
    context.lineTo(x + 150, 200);
    context.lineTo(x + 150, 400);
    context.lineTo(x + 550, canvas.height - 180);
    context.lineTo(x + 520, canvas.height - 80);
    context.lineTo(x + 50, canvas.height - 80);
    context.lineTo(x + 50, 200);
    context.fill();
}

function drawBoneBeak(x) {
    context.beginPath();
    context.moveTo(x + 100, 50);
    context.lineTo(x + 150, 50);
    context.lineTo(x + 150, 200);
    context.arc(x + 150, 250, 200, -Math.PI / 2, 0);
    context.lineTo(x + 550, canvas.height - 180);
    context.lineTo(x + 520, canvas.height - 80);
    context.arc(x + 550, 250, 200, Math.PI / 2, Math.PI);
    context.lineTo(x + 50, canvas.height - 80);
    context.fill();
}

const shapes = [
    drawHourglass,
    drawChunk,
    drawHat,
    drawShoe,
    drawPizza,
    drawBoneBeak,
];

function randomShapes() {
    let choice1 = 0;
    let choice2 = 0;
    while (choice1 == choice2) {
        choice1 = Math.floor(Math.random() * shapes.length);
        choice2 = Math.floor(Math.random() * shapes.length);
    }
    return [shapes[choice1], shapes[choice2]];
}

let [leftShape, rightShape] = randomShapes();

const object = {
    x: 50,
};

function update() {
    // object.x = object.x + 10;
    if (object.x > canvas.width) {
        [leftShape, rightShape] = randomShapes();
        // object.x = -550;
    }
}

function render() {
    drawLeftSection();
    drawRightSection();
}

function start() {
    update();
    render();
    requestAnimationFrame(start);
}

let objectMove = false;
let mousePosition = 0;

function handleMouseDown(e) {
    objectMove = true;
    mousePosition = e.clientX;
}

function handleMouseMove(e) {
    if (objectMove) {
        object.x = e.clientX - 300;
        // object.x = object.x + (e.clientX - mousePosition) / 20;
    }
}

function handleMouseUp(e) {
    objectMove = false;
}

window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('mouseup', handleMouseUp);

start();
