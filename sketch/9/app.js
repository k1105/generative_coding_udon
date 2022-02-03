const num = 150; //num of circle
const step = 0.01; // udon_length = num * step
const anchorNum = 10;
const pi = Math.PI;
const boundaryRadius = 100;
const udonWidth = 20;
const dishSize = 300;
let angle = pi / 4;
let delta = 0;
let trajectory = [];
let points = [];
let time = 0;
let rows;
let cols;

function setup() {
  createCanvas((w = windowWidth), (h = windowHeight));
  rows = ceil(w / dishSize);
  cols = ceil(h / dishSize);
  stroke(255, 255, 230);
  fill(255, 255, 230);

  // initialize points
  for (let n = 0; n < rows * cols; n++) {
    trajectory[n] = [];
    points[n] = [];

    trajectory[n] = resetPositionInCircle(anchorNum, 0, 0, boundaryRadius);
    for (let i = 0; i < num; i++) {
      const t = i * step;
      points[n].push(getPositionOnTrajectory(t, trajectory[n]));
    }
  }
}

function draw() {
  background(0, 95, 171);
  push();
  noFill();
  strokeWeight(1);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      circle(
        dishSize * i + dishSize / 2,
        dishSize * j + dishSize / 2,
        dishSize
      );
    }
  }
  pop();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const pos = points[i * cols + j];
      push();
      translate(dishSize * i + dishSize / 2, dishSize * j + dishSize / 2);
      for (let k = 0; k < pos.length; k++) {
        circle(pos[k][0], pos[k][1], udonWidth);
      }
      pop();
    }
  }

  const t = ((num + time) * step) % anchorNum;
  for (let n = 0; n < rows * cols; n++) {
    points[n].shift();
    points[n].push(getPositionOnTrajectory(t, trajectory[n]));
  }
  time++;
}
