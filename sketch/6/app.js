class Anchor {
  constructor(position, length, angle) {
    this.initPosition = position;
    this.initAngle = angle;
    this.angle = angle;
    this.initLength = length;
    this.length = length;
    this.position = position;
    this.ratio = random();
    this.handle = [
      length * cos(angle) + this.position[0],
      length * sin(angle) + this.position[1],
    ];
    this.oppositeHandle = [
      this.ratio * length * cos(angle + pi) + this.position[0],
      this.ratio * length * sin(angle + pi) + this.position[1],
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
      this.ratio * this.length * cos(this.angle + pi) + this.position[0],
      this.ratio * this.length * sin(this.angle + pi) + this.position[1],
    ];
  }
}

let mic;
let p = [];
const pi = Math.PI;
let num = 0;
let vol;

function setup() {
  mic = new p5.AudioIn();
  mic.start();
  createCanvas((w = windowWidth), (h = windowHeight));
  stroke(234, 223, 208);
  strokeWeight(20);
  resetPosition();

  angle = pi / 4;
  delta = 0;
  i = 0;
  offset = 30;
  prevVol = 0;
}

function draw() {
  vol = mic.getLevel();
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

  console.log(vol);

  if (vol >= 0.08) {
    num = (num + 1) % 20;
    if (num == 0) {
      p = [];
    }
    anchor = new Anchor(
      [w * (random() - 0.5) + w / 2, h * (random() - 0.5) + h / 2],
      300,
      pi * 2 * random()
    );
    p.push(anchor);
  }

  //prevVol = vol;
}

// function mouseClicked() {
//   num++;
//   anchor = new Anchor([mouseX, mouseY], 300, pi * 2 * random());
//   p.push(anchor);
// }

const resetPosition = () => {
  num = 0;
  p = [];
};

setInterval(resetPosition(), 5000);
