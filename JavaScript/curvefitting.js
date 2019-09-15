class circlePart {
  constructor(hl = null, al = null, ang = null, r = null, a = null) {
    this.hypo_len = hl;
    this.arc_len = al;
    this.angle = ang;
    this.radius = r;
    this.area = a;
  }

  toRadian(angle) {
    return (angle * Math.PI) / 180;
  }

  // https://mycurvefit.com
  // y = -2.013357 + (0.9998024 - -2.013357)/(1 + (x/485.4191)^2.002999)
  /*
    0               1
    22.5             0.9933
    45               0.974
    67.5             0.9431
    90               0.9003
    112.5             0.8469
    135               0.784188
    157.5             0.71355
    180               0.6366
  */
  calcAngle() {
    console.assert(this.hypo_len);
    console.assert(this.arc_len);
    // Calculate the Ratio
    let ratio = this.hypo_len / this.arc_len;
    // Used curve fitting to get a curve that is somewhat near the expected result

    this.angle = 485.419 * Math.pow(3.01316/(ratio + 2.01316) - 1, 0.4992513725668360);
  }

  calcRadius() {
    console.assert(this.angle);
    console.assert(this.hypo_len);
    // sinussatz
    let otherAngle = (180 - this.angle) / 2;
    this.radius = this.hypo_len /
      Math.sin(this.toRadian(this.angle)) * Math.sin(this.toRadian(otherAngle));
  }

  calcArea() {
    console.assert(this.angle);
    console.assert(this.radius);
    let ratio = 360/this.angle;
    let circle_area = Math.PI * Math.pow(this.radius, 2);
    this.area = circle_area / ratio;
  }

  calcMissing() {
    if (this.angle && this.radius) {

    } else if (this.area && this.radius) {

    } else if (this.arc_len && this.hypo_len) {
      this.calcAngle();
      this.calcRadius();
      this.calcArea();
    } else {
      console.log("Not enough parameters avaiable");
    }
  }

}



function pairwise(arr, arg) {
  let part = new circlePart(2, Math.PI);

  part.calcMissing();

  console.log(part);

  return arg;
}

pairwise([1,4,2,3,0,5], 7);
