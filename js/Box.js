class Box {

    constructor(x, y, z, l, h, w) {
        this.length = l;
        this.width = w;
        this.heigth = h;
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

    translateX(x){
        for(var i = 0;i<this.vertexes.length;i++){
            this.vertexes[i].x+=x;
        }
    }

    translateY(y){
        for(var i = 0;i<this.vertexes.length;i++){
            this.vertexes[i].y+=y;
        }
    }

    translateZ(z){
        for(var i = 0;i<this.vertexes.length;i++){
            this.vertexes[i].z+=z;
        }
    }
}