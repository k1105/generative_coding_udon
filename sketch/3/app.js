function setup() {
  createCanvas((w = windowWidth), (h = windowHeight));
  background(0);
  stroke(255);
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
  background(0);
  noFill();

  delta += 0.01;
  angle += (Math.PI / 100) * noise(delta);

  a1 = [100 * cos(angle) + init[0][0], 100 * sin(angle) + init[0][1]];
  b1 = [-100 * cos(angle) + init[1][0], -100 * sin(angle) + init[1][1]];
  a2 = [
    -100 * cos(angle + pi) + init[1][0],
    -100 * sin(angle + pi) + init[1][1],
  ];
  b2 = [100 * cos(angle + pi) + init[2][0], 100 * sin(angle + pi) + init[2][1]];
  bezier(p[0][0], p[0][1], a1[0], a1[1], b1[0], b1[1], p[1][0], p[1][1]);
  bezier(p[1][0], p[1][1], a2[0], a2[1], b2[0], b2[1], p[2][0], p[2][1]);
}

const resetPosition = () => {
  for (i = 0; i < 10; i++) {
    p[i] = [w * (random() - 0.5) + w / 2, h * (random() - 0.5) + h / 2];
  }

  init = p;

  console.log(p);
};

setInterval(resetPosition, 2000);

//p[0][1] = -(h / 4) * cos(angle) + init[0][1];
//p[1][1] = (h / 3) * sin(angle) + init[1][1];
//p[2][1] = (h / 5) * sin(angle) + init[2][1];
