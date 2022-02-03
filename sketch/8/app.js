const resetPosition = () => {
  let p = new Array(num);
  for (i = 0; i < num; i++) {
    k = random();
    r = 300 * k;
    theta = pi * 2 * random();
    const position = [r * cos(theta) + w / 2, r * sin(theta) + h / 2];
    p[i] = new Anchor(
      position,
      100,
      k * (theta + pi / 2) + (1 - k) * (2 * pi * random())
    );
  }

  return p;
};

const num = 10;
const pi = Math.PI;
let angle = pi / 4;
let delta = 0;

function setup() {
  createCanvas((w = windowWidth), (h = windowHeight));
  stroke(255, 255, 230);
  strokeWeight(20);
  p = resetPosition();
}

function draw() {
  background(2, 63, 51);
  delta += 0.01;
  angle += (pi / 100) * noise(delta);

  for (let i = 0; i < num; i++) {
    next = (i + 1) % num;
    p[i].updateAngle(p[i].initAngle + 2 * pi * sin(delta));
  }

  for (let i = 0; i < num - 1; i++) {
    bezierFromAnchor(p[i], p[i + 1]);
  }
}

const drawCircleOnBezier = (x1, y1, x2, y2, x3, y3, x4, y4) => {
  // de Casteljau's algorithm (https://pomax.github.io/bezierinfo/#decasteljau)
  const input = [
    [x1, y1],
    [x2, y2],
    [x3, y3],
    [x4, y4],
  ];
  const calcPoint = (p, t) => {
    if (p.length == 1) {
      return p;
    } else {
      const new_points = [];
      for (let i = 0; i < p.length - 1; i++) {
        const new_point = [
          p[i][0] * t + p[i + 1][0] * (1 - t),
          p[i][1] * t + p[i + 1][1] * (1 - t),
        ];
        new_points.push(new_point);
      }

      return calcPoint(new_points, t);
    }
  };
  const num = 5;
  const step = 1 / num;
  for (let t = 0; t < 1; t += step) {
    //calculate point
    const p = calcPoint(input, t)[0];
    //circle(p[0], p[1], 10);
    push();
    noStroke();
    textSize(32);
    fill(255, 255, 230);
    text("404", p[0], p[1]);
    pop();
  }
};

const bezierFromAnchor = (a0, a1) => {
  drawCircleOnBezier(
    a0.position[0],
    a0.position[1],
    a0.oppositeHandle[0],
    a0.oppositeHandle[1],
    a1.handle[0],
    a1.handle[1],
    a1.position[0],
    a1.position[1]
  );
};
