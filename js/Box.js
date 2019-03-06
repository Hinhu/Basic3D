class Box {

    constructor(x, y, z, l, h, w, color) {
        this.length = l;
        this.width = w;
        this.heigth = h;
        this.color = color;
        this.vertexes = [
            new Point3D(x - l, y - h, z - w),
            new Point3D(x + l, y - h, z - w),
            new Point3D(x + l, y + h, z - w),
            new Point3D(x - l, y + h, z - w),
            new Point3D(x - l, y - h, z + w),
            new Point3D(x + l, y - h, z + w),
            new Point3D(x + l, y + h, z + w),
            new Point3D(x - l, y + h, z + w)
        ];

        this.faces = [
            [0, 1, 2, 3],
            [0, 4, 5, 1],
            [1, 5, 6, 2],
            [3, 2, 6, 7],
            [0, 3, 7, 4],
            [4, 7, 6, 5]
        ];

    }

    translateX(x) {
        for (var i = 0; i < this.vertexes.length; i++) {
            this.vertexes[i].x += x;
        }
    }

    translateY(y) {
        for (var i = 0; i < this.vertexes.length; i++) {
            this.vertexes[i].y += y;
        }
    }

    translateZ(z) {
        for (var i = 0; i < this.vertexes.length; i++) {
            this.vertexes[i].z += z;
        }
    }

    rotateX(radian) {

        var sin = Math.sin(radian);
        var cos = Math.cos(radian);

        for (var i = 0; i < this.vertexes.length; i++) {

            var p = this.vertexes[i];

            p.y = p.y * cos - p.z * sin;
            p.z = p.y * sin + p.z * cos;

        }

    }

    rotateY(radian) {

        var sin = Math.sin(radian);
        var cos = Math.cos(radian);

        for (var i = 0; i < this.vertexes.length; i++) {

            var p = this.vertexes[i];

            p.x = p.z * sin + p.x * cos;
            p.z = p.z * cos - p.x * sin;

        }

    }

    rotateZ(radian) {

        var sin = Math.sin(radian);
        var cos = Math.cos(radian);

        for (var i = 0; i < this.vertexes.length; i++) {

            var p = this.vertexes[i];

            p.x = p.x * cos - p.y * sin;
            p.y = p.y * cos + p.x * sin;

        }

    }

    project(focalLenght, width, heigth) {
        var points = new Array(this.vertexes.length);

        for (var i = 0; i < points.length; i++) {

            let p = this.vertexes[i];

            let x = p.x * (focalLenght / p.z) + width * 0.5;
            let y = p.y * (focalLenght / p.z) + heigth * 0.5;

            points[i] = new Point2D(x, y);
        }
        return points;
    }

    isLeftBehind() {
        for (var i = 0; i < this.vertexes.length; i++) {
            if (this.vertexes[0].z < this.width) {
                return true;
            }
        }
        return false;
    }

}