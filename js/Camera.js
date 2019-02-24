var context = document.querySelector("canvas").getContext("2d");

var boxes = [
    new Box(30, 2, 50, 5, 10, 5),
    new Box(3, 2, 50, 5, 20, 5)
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
        boxes[i].draw(context, "#FFFFFF", 300);
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
    }else if (event.keyCode === 37) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].translateX(0.5);
        }
    }else if (event.keyCode === 39) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].translateX(-0.5);
        }
    }else if (event.keyCode === 38) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].translateZ(-0.5);
        }
    }else if (event.keyCode === 40) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].translateZ(0.5);
        }
    }
});



loop();
