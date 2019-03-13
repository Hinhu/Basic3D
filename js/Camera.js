var context = document.querySelector("canvas").getContext("2d");


var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;
var focalLength = 1000;

var areStrokesVisible = false;

var boxes = [
    new Box(0, 0, 31, 5, 5, 0.3, "#848d9b"),
    new Box(1, 1, 32, 5, 5, 0.3, "#7a1818"),
    new Box(2, 2, 33, 5, 5, 0.3, "#13ad22"),
    new Box(3, 3, 34, 5, 5, 0.3, "#0d62e5"),
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
            var p = [];
            for (var k = 0; k < 4; k++) {
                p.push(box.vertexes[box.faces[j][k]]);
            }

            var facePoints = [];

            facePoints[0] = p[0];
            facePoints[10] = p[1];
            facePoints[110] = p[3];
            facePoints[120] = p[2];

            for (var k = 0; k <= 9; k++) {
                facePoints[k] = new Point3D(
                    (k * (p[1].x - p[0].x)) / 10 + p[0].x,
                    (k * (p[1].y - p[0].y)) / 10 + p[0].y,
                    (k * (p[1].z - p[0].z)) / 10 + p[0].z,
                )
            }
            var indexes = []
            for (var k = 11; k <= 99; k += 11) {
                indexes.push(k);
            }

            for (var k = 0; k <= 9; k++) {
                facePoints[indexes[k]] = new Point3D(
                    ((k + 1) * (p[3].x - p[0].x)) / 10 + p[0].x,
                    ((k + 1) * (p[3].y - p[0].y)) / 10 + p[0].y,
                    ((k + 1) * (p[3].z - p[0].z)) / 10 + p[0].z,
                )
            }

            var indexes = []
            for (var k = 21; k <= 109; k += 11) {
                indexes.push(k);
            }

            for (var k = 0; k <= 9; k++) {
                facePoints[indexes[k]] = new Point3D(
                    ((k + 1) * (p[2].x - p[1].x)) / 10 + p[1].x,
                    ((k + 1) * (p[2].y - p[1].y)) / 10 + p[1].y,
                    ((k + 1) * (p[2].z - p[1].z)) / 10 + p[1].z,
                )
            }

            var indexes = []
            for (var k = 111; k <= 199; k++) {
                indexes.push(k);
            }

            for (var k = 0; k <= 9; k++) {
                facePoints[indexes[k]] = new Point3D(
                    ((k + 1) * (p[2].x - p[3].x)) / 10 + p[3].x,
                    ((k + 1) * (p[2].y - p[3].y)) / 10 + p[3].y,
                    ((k + 1) * (p[2].z - p[3].z)) / 10 + p[3].z,
                )
            }

            var indexes = []
            for (var k = 0; k <= 8; k++) {
                for (var l = 12 + k * 11; l <= 20 + k * 11; l++) {
                    indexes.push(l);
                }
            }

            for (var k = 0; k < 81; k++) {
                let index = indexes[k];
                facePoints[index] = new Point3D(
                    facePoints[index - 1].x + facePoints[index - 11].x - facePoints[index - 12].x,
                    facePoints[index - 1].y + facePoints[index - 11].y - facePoints[index - 12].y,
                    facePoints[index - 1].z + facePoints[index - 11].z - facePoints[index - 12].z
                );
            }

            for (var k = 0; k < 100; k++) {
                let l = Math.floor(k / 10);
                var subFacePoints = [
                    facePoints[k + l],
                    facePoints[k + l + 1],
                    facePoints[k + l + 12],
                    facePoints[k + l + 11],
                ];

                if (areStrokesVisible) {
                    var face = new Face(subFacePoints, box.color, "#FFFFFF");
                } else {
                    var face = new Face(subFacePoints, box.color, box.color);
                }
                if (face.isBack(width / 2, height / 2, focalLength)) {
                    continue;
                }
                facesToRender.push(face);
            }

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
    } else if( event.keyCode == 96){
        areStrokesVisible=!areStrokesVisible;
    }
    calculateFaces();
});


calculateFaces();
loop();
