class Box {

    constructor(x, y, z, l, h, w, color) {
        this.length = l;
        this.width = w;
        this.heigth = h;
        this.color = color;
        this.vertexes = [
            new Point3D(x, y, z),
            new Point3D(x, y + this.heigth, z),
            new Point3D(x + this.length, y + this.heigth, z),
            new Point3D(x + this.length, y, z),
            new Point3D(x, y, z - this.width),
            new Point3D(x, y + this.heigth, z - this.width),
            new Point3D(x + this.length, y + this.heigth, z - this.width),
            new Point3D(x + this.length, y, z - this.width)
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

    isLeftBehind(){
        for (var i = 0; i < this.vertexes.length; i++) {
            if(this.vertexes[0].z<this.width){
                return true;
            }
        }
        return false;
    }

    draw(context, focalLenght, width, heigth) {

        var vertexes = this.project(focalLenght, width, heigth);

        context.strokeStyle = this.color;

        for (var i = 0; i < 2; i++) {
            context.beginPath();
            context.moveTo(vertexes[i * 4].x, vertexes[i * 4].y);
            context.lineTo(vertexes[i * 4 + 1].x, vertexes[i * 4 + 1].y);
            context.lineTo(vertexes[i * 4 + 2].x, vertexes[i * 4 + 2].y);
            context.lineTo(vertexes[i * 4 + 3].x, vertexes[i * 4 + 3].y);
            context.closePath();
            context.stroke();
        }

        for (var i = 0; i < 4; i++) {
            context.beginPath();
            context.moveTo(vertexes[i].x, vertexes[i].y);
            context.lineTo(vertexes[i + 4].x, vertexes[i + 4].y);
            context.closePath();
            context.stroke();
        }
    }
}