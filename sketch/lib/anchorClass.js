class Anchor {
  constructor(position, length, angle) {
    this.initPosition = position;
    this.initAngle = angle;
    this.angle = angle;
    this.initLength = length;
    this.length = length;
    this.position = position;
    this.handle = [
      length * cos(angle) + this.position[0],
      length * sin(angle) + this.position[1],
    ];
    this.oppositeHandle = [
      length * cos(angle + pi) + this.position[0],
      length * sin(angle + pi) + this.position[1],
    ];
  }

  updateAngle(angle) {
    // console.log(angle);
    this.angle = angle;
    this.updateHadle();
  }

  updateLength(length) {
    this.length = length;
    this.updateHadle();
  }

  updateHadle() {
    //private
    this.handle = [
      this.length * cos(this.angle) + this.position[0],
      this.length * sin(this.angle) + this.position[1],
    ];
    this.oppositeHandle = [
      this.length * cos(this.angle + pi) + this.position[0],
      this.length * sin(this.angle + pi) + this.position[1],
    ];
  }
}
