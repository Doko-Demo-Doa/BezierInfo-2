let curve;

setup() {
    const type = this.parameters.type ?? `quadratic`;
    curve = (type === `quadratic`) ? Bezier.defaultQuadratic(this) : Bezier.defaultCubic(this);
    setMovable(curve.points);
}

draw() {
    resetTransform();
    clear();
    curve.drawSkeleton();
    curve.drawCurve();
    curve.drawPoints();

    translate(this.width/2, 0);
    line(0,0,0,this.height);

    this.drawRTCurve(
        this.rotatePoints(
            this.translatePoints(
                curve.points
            )
        )
    );
}

translatePoints(points) {
    // translate to (0,0)
    let m = points[0];
    return points.map(v => {
        return {
            x: v.x - m.x,
            y: v.y - m.y
        }
    });
}

rotatePoints(points) {
    // rotate so that last point is (...,0)
    let degree = curve.points.length - 1;
    let dx = points[degree].x;
    let dy = points[degree].y;
    let a = atan2(dy, dx);
    return points.map(v => {
        return {
            x: v.x * cos(-a) - v.y * sin(-a),
            y: v.x * sin(-a) + v.y * cos(-a)
        };
    });
}

drawRTCurve(points) {
    let degree = curve.points.length - 1;
    let ncurve = new Bezier(this, points);
    translate(60, this.height/2);
    setStroke(`grey`);
    line(0,-this.height,0,this.height);
    line(-60,0,this.width,0);
    ncurve.drawCurve();
    setFill(`black`);
    text(`(0,0)`, 5,15);
    text(`(${points[degree].x|0},0)`, points[degree].x, -5, CENTER);
}
