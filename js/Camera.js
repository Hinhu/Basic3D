var context = document.querySelector("canvas").getContext("2d");


var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;
var focalLength = 400;

var boxes = [
    new Box(-20, -5, 50, 5, 15, 5, "#848d9b"),
    new Box(-20, -5, 90, 5, 15, 5, "#7a1818"),
    new Box(20, -5, 50, 5, 15, 5, "#13ad22"),
    new Box(20, -5, 90, 5, 15, 5, "#0d62e5"),
];

var facesToRender = [];

function calculateFaces() {
    var boxesToRender = [];
    for (var i = 0; i < boxes.length; i++) {
        if (!boxes[i].isLeftBehind()) {
            boxesToRender.push(boxes[i]);
        }
    }

    facesToRender = [];
    for (var i = 0; i < boxesToRender.length; i++) {
        var box = boxesToRender[i];
        for (var j = 0; j < 6; j++) {
            var facePoints = [];
            for (var k = 0; k < 4; k++) {
                facePoints.push(box.vertexes[box.faces[j][k]]);
            }
            var face = new Face(facePoints, box.color);
            if (face.isBack(width / 2, height / 2, focalLength)) {
                continue;
            }
            facesToRender.push(face);
        }
    }

    paintersAlgorithm(facesToRender);
}

function loop() {

    window.requestAnimationFrame(loop);

    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;

    context.canvas.height = height;
    context.canvas.width = width;

    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);


    for (var i = 0; i < facesToRender.length; i++) {
        facesToRender[i].draw(context, focalLength, width, height);
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
            boxes[i].rotateY(0.05);
        }
    } else if (event.keyCode === 102) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].rotateY(-0.05);
        }
    } else if (event.keyCode === 103) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].rotateZ(0.05);
        }
    } else if (event.keyCode === 105) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].rotateZ(-0.05);
        }
    } else if (event.keyCode == 107) {
        focalLength += 10;
    } else if (event.keyCode == 109) {
        focalLength -= 10;
    }
    calculateFaces();
});


calculateFaces();
loop();
