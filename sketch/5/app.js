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

function setup() {
  num = 1;
  createCanvas((w = windowWidth), (h = windowHeight));
  stroke(234, 223, 208);
  strokeWeight(20);
  pi = Math.PI;

  p = [];

  resetPosition();

  init = p;

  angle = pi / 4;
  delta = 0;
  i = 0;
  offset = 30;
}

function draw() {
  background(2, 63, 51);
  noFill();

  delta += 0.01;
  angle += (pi / 100) * noise(delta);

  for (i = 0; i < num; i++) {
    next = (i + 1) % num;
    p[i].updateAngle(p[i].angle + (pi / 100) * noise(delta));
  }

  // draw Udon
  for (i = 0; i < num - 1; i++) {
    next = (i + 1) % num;

    bezier(
      p[i].position[0],
      p[i].position[1],
      p[i].oppositeHandle[0],
      p[i].oppositeHandle[1],
      p[next].handle[0],
      p[next].handle[1],
      p[next].position[0],
      p[next].position[1]
    );
  }
}

function mouseClicked() {
  num++;
  anchor = new Anchor([mouseX, mouseY], 300, pi * 2 * random());
  p.push(anchor);
}

const resetPosition = () => {
  for (i = 0; i < num; i++) {
    position = [w * (random() - 0.5) + w / 2, h * (random() - 0.5) + h / 2];
    p[i] = new Anchor(position, 300, pi * 2 * random());
  }

  init = p;
};
