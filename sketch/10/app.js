const num = 300; //num of circle
const step = 0.01; // udon_length = num * step
const anchorNum = 10;
const pi = Math.PI;
const boundaryRadius = 300;
const udonWidth = 10;
let angle = pi / 4;
let delta = 0;
let trajectory = [];
let points = [];
let time = 0;

function setup() {
  createCanvas((w = windowWidth), (h = windowHeight));
  stroke(255, 255, 230);
  trajectory = resetPositionInCircle(anchorNum, boundaryRadius);
  // initialize points
  for (let i = 0; i < num; i++) {
    const t = i * step;
    points.push(getPositionOnTrajectory(t, trajectory));
  }
}

function draw() {
  background(157, 155, 156);
  push();
  noFill();
  strokeWeight(1);

  //circle(w / 2, h / 2, 750);
  pop();
  for (let i = 0; i < points.length; i++) {
    push();
    noStroke();
    fill(255, 255, 230);
    circle(points[i][0], points[i][1], 25 * (1 + noise(0.01 * i)));
    pop();
  }
  points.shift();
  const t = ((num + time) * step) % anchorNum;
  points.push(getPositionOnTrajectory(t, trajectory));
  push();
  fill(104, 233, 76);
  noStroke();
  textSize(40);
  const textIndex = Math.ceil(t);
  text(
    "ねぎ",
    trajectory[textIndex % trajectory.length].position[0],
    trajectory[textIndex % trajectory.length].position[1]
  );
  text(
    "ねぎ",
    trajectory[(textIndex + 1) % trajectory.length].position[0],
    trajectory[(textIndex + 1) % trajectory.length].position[1]
  );
  pop();
  time++;
}

const resetPositionInCircle = (num, radius) => {
  let p = new Array(num);
  for (i = 0; i < num; i++) {
    k = random();
    theta = pi * 2 * random();
    const position = [radius * cos(theta) + w / 2, radius * sin(theta) + h / 2];
    p[i] = new Anchor(
      position,
      radius / 4,
      k * (theta + pi / 2) + (1 - k) * (2 * pi * random())
    );
  }

  return p;
};
