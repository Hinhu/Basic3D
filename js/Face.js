class Face {
    constructor(points, color) {
        this.points = points;
        this.color = color;

        this.maxZ = points[0].z;
        for (var i = 1; i < 4; i++) {
            if (this.maxZ < points[i].z) {
                this.maxZ = points[i].z;
            }
        }

        this.minZ = points[0].z;
        for (var i = 1; i < 4; i++) {
            if (this.minZ > points[i].z) {
                this.minZ = points[i].z;
            }
        }

        this.maxY = points[0].y;
        for (var i = 1; i < 4; i++) {
            if (this.maxY < points[i].y) {
                this.maxY = points[i].y;
            }
        }

        this.minY = points[0].y;
        for (var i = 1; i < 4; i++) {
            if (this.minY > points[i].y) {
                this.minY = points[i].y;
            }
        }

        this.maxX = points[0].x;
        for (var i = 1; i < 4; i++) {
            if (this.maxX < points[i].x) {
                this.maxX = points[i].x;
            }
        }

        this.minX = points[0].x;
        for (var i = 1; i < 4; i++) {
            if (this.minX > points[i].x) {
                this.minX = points[i].x;
            }
        }
    }

    isBack(x, y, z) {
        var p1 = this.points[0];
        var p2 = this.points[1];
        var p3 = this.points[2];

        let v1 = new Point3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
        let v2 = new Point3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
        let n = new Point3D(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
        
        return -p1.x * n.x + -p1.y * n.y + -p1.z * n.z > 0;
    }

    project(focalLenght, width, heigth) {
        var points = new Array(this.points.length);

        for (var i = 0; i < points.length; i++) {

            let p = this.points[i];

            let x = p.x * (focalLenght / p.z) + width * 0.5;
            let y = p.y * (focalLenght / p.z) + heigth * 0.5;

            points[i] = new Point2D(x, y);
        }
        return points;
    }

    draw(context, focalLenght, width, heigth) {
        var points = this.project(focalLenght, width, heigth);

        context.strokeStyle = "#FFFFFF";
        context.fillStyle = this.color;

        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (var k = 1; k <= 3; k++) {
            context.lineTo(points[k].x, points[k].y);
        }
        context.closePath();
        context.fill();
        context.stroke();
    }
}