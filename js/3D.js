var context = document.querySelector("canvas").getContext("2d");

function loop() {

    window.requestAnimationFrame(loop);

    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;

    context.canvas.height = height;
    context.canvas.width  = width;

    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);
}

loop();