var context = document.querySelector("canvas").getContext("2d");

var boxes = [
    new Box(-10, 0, 20, 5, 5, 5, "#FFFFFF"),
    new Box(-10, -5, 30, 5, 10, 5, "#FF0000"),
    new Box(5, -10, 20, 5, 15, 5, "#00FF00"),
    new Box(5, -20, 30, 5, 25, 5, "#0000FF"),
];

function loop() {

    window.requestAnimationFrame(loop);

    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;

    context.canvas.height = height;
    context.canvas.width = width;

    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].draw(context, 400, width, height);
    }
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 32) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].translateY(0.5);
        }
    } else if (event.keyCode === 67) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].translateY(-0.5);
        }
    } else if (event.keyCode === 37) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].translateX(0.5);
        }
    } else if (event.keyCode === 39) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].translateX(-0.5);
        }
    } else if (event.keyCode === 38) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].translateZ(-0.5);
        }
    } else if (event.keyCode === 40) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].translateZ(0.5);
        }
    } else if (event.keyCode === 104) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].rotateX(-0.05);
        }
    } else if (event.keyCode === 98) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].rotateX(0.05);
        }
    } else if (event.keyCode === 100) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].rotateY(-0.05);
        }
    } else if (event.keyCode === 102) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].rotateY(0.05);
        }
    } else if (event.keyCode === 103) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].rotateZ(-0.05);
        }
    } else if (event.keyCode === 105) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].rotateZ(0.05);
        }
    }
});



loop();
